import pymysql

class MySqlHelper:
    def __init__(self):
        self.conn = pymysql.connect(
            host='localhost',
            user='root',
            password='',
            database='school',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )

    def fetch_movies(self):
        with self.conn.cursor() as cursor:
            cursor.execute("SELECT title, rating FROM movies")
            rows = cursor.fetchall()
        return rows

    def fetch_user_password(self, username):
        with self.conn.cursor() as cursor:
            cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
            return cursor.fetchone()

    def insert_user(self, username, password):
        with self.conn.cursor() as cursor:
            cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        self.conn.commit()

    def close(self):
        self.conn.close()
