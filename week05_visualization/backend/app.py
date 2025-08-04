from flask import Flask, jsonify
from flask_cors import CORS
from db_helper import MySqlHelper  # 确保这个模块存在并正确配置了数据库连接

app = Flask(__name__)
CORS(app)  # 允许跨域请求，方便前端访问

@app.route('/')
def index():
    return jsonify({"message": "后端服务运行成功，请访问 /api/movies 获取数据。"})

@app.route('/api/movies')
def douban_top10():
    try:
        print("🚀 正在尝试连接数据库...")
        db = MySqlHelper()
        data = db.fetch_chart_data()
        print("✅ 数据获取成功:", data)
        return jsonify(data)
    except Exception as e:
        print("❌ 数据库连接或查询出错：", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
