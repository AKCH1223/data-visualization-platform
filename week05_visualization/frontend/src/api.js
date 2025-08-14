import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api"; // 后端接口地址

export const fetchDoubanTop10 = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/douban_top10`);
    return res.data; // 返回电影数据
  } catch (err) {
    console.error("获取电影数据失败:", err);
    return [];
  }
};
