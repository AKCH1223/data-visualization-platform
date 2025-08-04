// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // 后端 Flask 接口地址

export const fetchDoubanTop10 = async () => {
  const res = await axios.get(`${BASE_URL}/api/douban_top10`);
  return res.data;
};
