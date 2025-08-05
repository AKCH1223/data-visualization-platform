import React, { useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  // 画板初始化
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // 画板绘画逻辑
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

  // 清除画板
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setResult(null);
  };

  // 上传文件选择
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  // 调用后端识别接口（传画板图片或者上传图片）
  const handlePredict = async (type) => {
    let imageData;
    if (type === 'canvas') {
      const canvas = canvasRef.current;
      imageData = canvas.toDataURL('image/png');
    } else if (type === 'upload') {
      if (!file) {
        alert('请选择图片文件');
        return;
      }
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    try {
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });
      const data = await res.json();
      setResult(data.prediction);
    } catch (err) {
      setResult('识别失败');
    }
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
      <button onClick={() => handlePredict('canvas')}>识别画板数字</button>
      <button onClick={clearCanvas}>清空画板</button>

      <h2>上传图片识别</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={() => handlePredict('upload')}>上传图片识别</button>

      {result !== null && <h2>识别结果: {result}</h2>}
    </div>
  );
}

export default App;
