from flask import Flask, request, jsonify, send_from_directory
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from network import Network
import mnist_loader

app = Flask(__name__, static_folder='static')

# 加载模型
net = Network([784, 30, 10])
net.load("model_params.pkl")

def preprocess_image(image_data_base64):
    image_data = base64.b64decode(image_data_base64.split(",")[1])
    image = Image.open(BytesIO(image_data)).convert('L')
    image = image.resize((28, 28)).point(lambda x: 255 - x)  # 反色
    image_array = np.asarray(image).astype(np.float32)
    image_array = image_array.reshape(784, 1) / 255.0  # 归一化
    return image_array

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    img_base64 = data['image']
    x = preprocess_image(img_base64)
    prediction = net.predict(x)
    return jsonify({'prediction': int(prediction)})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
