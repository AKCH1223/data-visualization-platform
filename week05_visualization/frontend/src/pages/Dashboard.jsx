// src/pages/Dashboard.jsx
import React from "react";
import { Tabs } from "antd";
import DoubanBarChart from "../components/DoubanBarChart";
import DigitRecognition from "../components/DigitRecognition";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>数据可视化平台 Dashboard</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="电影评分" key="1">
          <DoubanBarChart />
        </Tabs.TabPane>
        <Tabs.TabPane tab="手写数字识别" key="2">
          <DigitRecognition />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
