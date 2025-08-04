from db_helper import MySqlHelper

if __name__ == '__main__':
    try:
        print("🚀 测试数据库连接中...")
        db = MySqlHelper()
        data = db.fetch_chart_data()
        print("✅ 成功获取数据：", data)
    except Exception as e:
        print("❌ 数据库连接失败：", e)
