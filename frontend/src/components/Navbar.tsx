import React from 'react';
import { Layout, Breadcrumb, Space, Avatar, Typography, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

interface NavbarProps {
  activeMenu: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeMenu, onLogout }) => {
  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0 24px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      boxShadow: '0 2px 8px #f0f1f2',
      zIndex: 1 
    }}>
      <Breadcrumb items={[
        { title: 'PosBuzz' }, 
        { title: activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1) }
      ]} />
      
      <Space>
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
        <Text strong>Admin</Text>
        <Button type="text" icon={<LogoutOutlined />} danger onClick={onLogout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
};