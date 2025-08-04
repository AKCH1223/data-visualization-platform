// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>欢迎你，{user?.username || '未知用户'}！</h1>
      <p>这里是登录后的可视化平台主页</p>
    </div>
  );
};

export default Dashboard;
