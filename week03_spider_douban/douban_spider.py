import requests
from bs4 import BeautifulSoup
from mysql_helper import MySqlHelper
import time

def get_movie_info_from_page(start):
    url = f"https://movie.douban.com/top250?start={start}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, "html.parser")

    movies = []

    items = soup.select('div.item')
    for item in items:
        rank = int(item.select_one('em').text.strip())
        title = item.select_one('span.title').text.strip()
        rating = float(item.select_one('span.rating_num').text.strip())
        quote_tag = item.select_one('span.inq')
        quote = quote_tag.text.strip() if quote_tag else ''
        info = item.select_one('div.bd p').text.strip().replace('\n', ' ')
        img_url = item.select_one('img')['src']

        movies.append({
            'rank': rank,
            'title': title,
            'rating': rating,
            'quote': quote,
            'info': info,
            'image_url': img_url
        })

    return movies

def create_table(helper):
    sql = """
    CREATE TABLE IF NOT EXISTS douban_top100 (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rank INT,
        title VARCHAR(255),
        rating FLOAT,
        quote TEXT,
        info TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    helper.execute(sql)

def insert_movies(helper, movies):
    sql = """
    INSERT INTO douban_top100 (rank, title, rating, quote, info, image_url)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    for movie in movies:
        helper.execute(sql, (
            movie['rank'],
            movie['title'],
            movie['rating'],
            movie['quote'],
            movie['info'],
            movie['image_url']
        ))
        print(f"已插入：{movie['rank']} - {movie['title']}")

if __name__ == "__main__":
    helper = MySqlHelper(password='', database='school')
    helper.connect()
    create_table(helper)

    all_movies = []
    for start in range(0, 100, 25):  # 分页：0, 25, 50, 75
        movies = get_movie_info_from_page(start)
        insert_movies(helper, movies)
        time.sleep(1)  # 防止请求太快被封

    helper.close()
    print("✅ 爬取并写入数据库完成！")
