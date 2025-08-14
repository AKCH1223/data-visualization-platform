// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute 用于保护需要登录才能访问的页面
 * 使用方法：
 * <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  // 从 localStorage 获取用户信息，判断是否登录
  const user = JSON.parse(localStorage.getItem('user'));

  // 如果没有登录，重定向到 /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 已登录则渲染子组件
  return children;
};

export default ProtectedRoute;
