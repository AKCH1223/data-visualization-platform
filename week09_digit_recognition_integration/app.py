from flask_cors import CORS
from flask import Flask, request, jsonify, send_from_directory
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from network import Network  # 自定义神经网络类
from mnist_loader import load_data_wrapper

app = Flask(__name__, static_folder='static')
CORS(app)

# 加载模型
net = Network([784, 30, 10])
net.load("model_params.pkl")

# 图像预处理
def preprocess_image(image_data_base64):
    try:
        image_data = base64.b64decode(image_data_base64.split(",")[1])
    except IndexError:
        image_data = base64.b64decode(image_data_base64)

    image = Image.open(BytesIO(image_data)).convert('L')  # 转为灰度图像
    image = image.resize((28, 28)).point(lambda x: 255 - x)  # 反色 + 缩放
    image_array = np.asarray(image).astype(np.float32) / 255.0
    image_array = image_array.reshape(784, 1)
    return image_array

# ✅ 模型准确率评估函数
def evaluate_model(net):
    _, _, test_data = load_data_wrapper()
    test_results = [(np.argmax(net.feedforward(x)), y) for (x, y) in test_data]
    correct = sum(int(pred == label) for (pred, label) in test_results)
    total = len(test_data)
    accuracy = correct / total * 100
    print(f"模型识别准确率：{accuracy:.2f}% ({correct}/{total})")

# 预测接口
@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data received'}), 400

    try:
        x = preprocess_image(data['image'])
        prediction = net.feedforward(x)
        predicted_label = int(np.argmax(prediction))
        return jsonify({'prediction': predicted_label})
    except Exception as e:
        print("预测异常:", str(e))
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# 前端页面
@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    evaluate_model(net)  # ⬅️ 启动时评估模型准确率
    app.run(debug=True)
