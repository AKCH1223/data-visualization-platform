import React, { useRef, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const DigitRecognition = () => {
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawing = useRef(false);
  const startDrawing = () => { drawing.current = true; };
  const stopDrawing = () => { drawing.current = false; };
  const draw = (e) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setFile(null);
  };

  const handlePredict = async (type) => {
    let imageData;
    if (type === 'canvas') {
      imageData = canvasRef.current.toDataURL('image/png');
    } else if (type === 'upload') {
      if (!file) { message.error('请选择图片文件'); return; }
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    try {
      const res = await axios.post('http://localhost:5000/api/predict', { image: imageData });
      setPrediction(res.data.prediction);
    } catch (err) {
      message.error('识别失败');
    }
  };

  const handleUpload = (uploadFile) => {
    setFile(uploadFile);
    setPrediction(null);
    return false; // 阻止自动上传
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>手写数字识别</h1>

      <h2>画板手写识别</h2>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{ border: '1px solid #ccc', background: 'black', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      />
      <br />
      <Button onClick={() => handlePredict('canvas')} style={{ marginRight: 10 }}>识别画板数字</Button>
      <Button onClick={clearCanvas}>清空画板</Button>

      <h2>上传图片识别</h2>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>上传手写数字图片</Button>
      </Upload>
      <Button onClick={() => handlePredict('upload')} style={{ marginTop: 10 }}>上传图片识别</Button>

      {prediction !== null && (
        <div style={{ marginTop: 20, fontSize: 18 }}>
          识别结果: <strong>{prediction}</strong>
        </div>
      )}
    </div>
  );
};

export default DigitRecognition;
