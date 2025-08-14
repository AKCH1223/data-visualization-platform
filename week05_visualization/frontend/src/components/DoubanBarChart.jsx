import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const DoubanBarChart = () => {
  const [data, setData] = useState({ titles: [], rating: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/movies");
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setData(res.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  const option = {
    title: { text: "豆瓣电影 Top10 评分" },
    tooltip: {},
    xAxis: { type: "category", data: data.titles },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: data.rating }],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default DoubanBarChart;
