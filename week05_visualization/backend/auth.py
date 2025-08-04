# auth.py
from flask import Blueprint, request, jsonify
import pymysql

# 创建 Blueprint（在 app.py 中注册）
auth_bp = Blueprint('auth', __name__)

# 数据库连接配置（可提取成 config 文件）
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'school',
    'port': 3306,
    'charset': 'utf8mb4'
}

def get_db_connection():
    return pymysql.connect(**db_config)


@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'code': 400, 'msg': '用户名和密码不能为空'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        return jsonify({'code': 409, 'msg': '用户名已存在'}), 409

    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    conn.commit()

    cursor.close()
    conn.close()
    return jsonify({'code': 200, 'msg': '注册成功'})


@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'code': 400, 'msg': '用户名和密码不能为空'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return jsonify({'code': 200, 'msg': '登录成功'})
    else:
        return jsonify({'code': 401, 'msg': '用户名或密码错误'}), 401
