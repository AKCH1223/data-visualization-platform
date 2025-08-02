from flask import Flask, render_template, jsonify
from db_helper import MySqlHelper

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/douban_top10')
def douban_top10():
    helper = MySqlHelper(password='')
    helper.connect()

    sql = "SELECT id, title, rating, rank FROM douban_movie ORDER BY rank ASC LIMIT 10"
    results = helper.fetch_all(sql)
    helper.close()

    # 拆分为前端用的数据结构
    titles = [row[1] for row in results]
    scores = [float(row[2]) for row in results]

    return jsonify({'titles': titles, 'scores': scores})

if __name__ == '__main__':
    app.run(debug=True)
