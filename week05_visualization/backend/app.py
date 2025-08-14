from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
import numpy as np
from PIL import Image
from io import BytesIO
from network import Network
from db_helper import MySqlHelper

app = Flask(__name__)
CORS(app)

# ==================== MySQL 数据库接口 ====================
@app.route('/api/movies', methods=['GET'])
def get_movies():
    try:
        db = MySqlHelper()
        rows = db.fetch_movies()
        db.close()

        titles = [row['title'] for row in rows]
        scores = [row['rating'] for row in rows]

        return jsonify({"titles": titles, "rating": scores})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==================== 手写数字识别 ====================
net = Network([784, 30, 10])
net.load("model_params.pkl")  # 模型文件放在 backend/

def preprocess_image(image_data_base64):
    try:
        image_data = base64.b64decode(image_data_base64.split(",")[1])
    except IndexError:
        image_data = base64.b64decode(image_data_base64)

    image = Image.open(BytesIO(image_data)).convert('L')
    image = image.resize((28, 28)).point(lambda x: 255 - x)
    img_array = np.asarray(image).astype(np.float32).reshape(784,1) / 255.0
    return img_array

@app.route('/api/predict', methods=['POST'])
def predict_digit():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data received'}), 400

    try:
        img_array = preprocess_image(data['image'])
        output = net.feedforward(img_array)
        pred = int(np.argmax(output))
        return jsonify({'prediction': pred})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== 登录注册 ====================
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        db = MySqlHelper()
        result = db.fetch_user_password(username)
        db.close()

        if result and result['password'] == password:
            return jsonify({"status": "success", "token": "mock_token"})
        else:
            return jsonify({"status": "fail", "message": "用户名或密码错误"}), 401
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        db = MySqlHelper()
        if db.fetch_user_password(username):
            db.close()
            return jsonify({"status": "fail", "message": "用户已存在"}), 400
        
        db.insert_user(username, password)
        db.close()
        return jsonify({"status": "success", "message": "注册成功"})
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
