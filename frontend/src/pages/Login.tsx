import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { api } from '../api/api'; // <--- Note: We added '../' to go back up to src folder

const { Title, Text } = Typography;

export function Login({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', values);
      localStorage.setItem('token', res.data.access_token);
      message.success('Welcome back!');
      onLogin();
    } catch (error) {
      try {
        await api.post('/auth/register', values);
        const res = await api.post('/auth/login', values);
        localStorage.setItem('token', res.data.access_token);
        message.success('Account created & Logged in!');
        onLogin();
      } catch (regError) {
        message.error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #1890ff 0%, #001529 100%)' }}>
      <Card style={{ width: 380, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>⚡</div>
          <Title level={3}>PosBuzz Login</Title>
          <Text type="secondary">Enter any email/password to start</Text>
        </div>
        <Form name="login" onFinish={onFinish} size="large" layout="vertical">
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email Address" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} icon={<LoginOutlined />}>
              Access Dashboard
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}