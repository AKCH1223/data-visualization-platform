// src/components/DoubanBarChart.jsx
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { fetchDoubanTop10 } from '../api';
import { Spin } from 'antd';

const DoubanBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoubanTop10().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const option = {
    title: {
      text: '豆瓣电影评分前10',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.map(item => item.title),
      axisLabel: { rotate: 45 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10
    },
    series: [
      {
        name: '评分',
        type: 'bar',
        data: data.map(item => item.rating),
        itemStyle: {
          color: '#1890ff'
        }
      }
    ]
  };

  return loading ? <Spin /> : <ReactECharts option={option} style={{ height: 400 }} />;
};

export default DoubanBarChart;
