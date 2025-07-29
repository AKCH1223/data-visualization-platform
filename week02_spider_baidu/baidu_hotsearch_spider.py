import requests
from bs4 import BeautifulSoup
from mysql_helper import MySqlHelper  # 确保 mysql_helper.py 与本文件同目录

def get_baidu_hotsearch_top10():
    url = "https://top.baidu.com/board?tab=realtime"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, "html.parser")

    # 根据页面结构选择热搜标题（此选择器需确认）
    hotsearch_items = soup.select('div.c-single-text-ellipsis')[:10]
    keywords = [item.get_text(strip=True) for item in hotsearch_items]

    return keywords

if __name__ == "__main__":
    helper = MySqlHelper(password='', database='school')
    helper.connect()

    # 创建表，避免重复创建出错
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS baidu_hotsearch (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rank INT NOT NULL,
        keyword VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    helper.execute(create_table_sql)

    keywords = get_baidu_hotsearch_top10()
    for rank, keyword in enumerate(keywords, start=1):
        insert_sql = "INSERT INTO baidu_hotsearch (rank, keyword) VALUES (%s, %s)"
        helper.execute(insert_sql, (rank, keyword))
        print(f"插入排名{rank}：{keyword}")

    helper.close()
