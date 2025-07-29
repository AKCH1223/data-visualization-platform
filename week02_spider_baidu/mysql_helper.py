import mysql.connector

class MySqlHelper:
    def __init__(self, host='localhost', user='root', password='', database='school'):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.conn = None
        self.cursor = None

    def connect(self):
        try:
            self.conn = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            self.cursor = self.conn.cursor()
            print("数据库连接成功！")
        except mysql.connector.Error as err:
            print("数据库连接失败：", err)

    def execute(self, sql, params=None):
        try:
            self.cursor.execute(sql, params or ())
            self.conn.commit()
        except mysql.connector.Error as err:
            print("执行失败：", err)

    def fetch_all(self, sql):
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
