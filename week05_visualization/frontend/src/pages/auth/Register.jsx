// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/register', values);
      if (res.data.code === 200) {
        message.success('注册成功');
      } else {
        message.error(res.data.msg);
      }
    } catch (error) {
      message.error('请求出错，请检查后端是否启动');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>用户注册</h2>
      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>注册</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
