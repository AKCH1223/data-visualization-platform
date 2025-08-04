// src/components/ChartContainer.jsx
import React from 'react';
import DoubanBarChart from './DoubanBarChart';

const ChartContainer = ({ current }) => {
  switch (current) {
    case 'douban':
      return <DoubanBarChart />;
    default:
      return <div>请选择图表</div>;
  }
};

export default ChartContainer;
