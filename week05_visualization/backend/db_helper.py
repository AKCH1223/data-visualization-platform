import pymysql

class MySqlHelper:
    def __init__(self):
        self.conn = pymysql.connect(
            host='localhost',
            user='root',
            password='',
            database='school',
            charset='utf8mb4'
        )
        self.cursor = self.conn.cursor()

    def fetch_chart_data(self):
        sql = "SELECT title, rating FROM douban_movie ORDER BY rank LIMIT 10"
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return [{'title': row[0], 'rating': row[1]} for row in result]
