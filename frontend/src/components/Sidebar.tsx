import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { DashboardOutlined, ShopOutlined, DollarOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (key: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  return (
    <Sider width={240} theme="dark" breakpoint="lg">
      <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>PosBuzz ⚡</Title>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={(e) => setActiveMenu(e.key)}
        items={[
          { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
          { key: 'inventory', icon: <ShopOutlined />, label: 'Inventory' },
          { key: 'sales', icon: <DollarOutlined />, label: 'Sales History' },
        ]}
      />
    </Sider>
  );
};