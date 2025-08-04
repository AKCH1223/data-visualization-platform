// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <div className="logo" style={{ float: 'left', color: 'white', fontWeight: 'bold', fontSize: 18 }}>
            可视化平台
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['login']}>
            <Menu.Item key="login">
              <Link to="/login">登录</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">注册</Link>
            </Menu.Item>
            <Menu.Item key="dashboard">
              <Link to="/dashboard">主页</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          数据可视化平台 ©2025 Created by You
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
