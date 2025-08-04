// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', values);
      if (res.data.code === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        message.success('登录成功');
        navigate('/dashboard');
      } else {
        message.error(res.data.msg || '登录失败');
      }
    } catch (err) {
      message.error('服务器错误');
    }
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>登录</h2>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>登录</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
