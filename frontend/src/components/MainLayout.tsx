import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

const { Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  setActiveMenu: (key: string) => void;
  onLogout: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeMenu, 
  setActiveMenu, 
  onLogout 
}) => {
  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      
      {/* 1. Sidebar Component */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        
        {/* 2. Navbar Component */}
        <Navbar activeMenu={activeMenu} onLogout={onLogout} />

        {/* 3. Main Page Content */}
        {/* FIX: overflowX: 'hidden' prevents the horizontal scrollbar */}
        <Content style={{ 
            margin: '24px 16px', 
            paddingBottom: 20,
            overflowY: 'auto',   // Allow vertical scroll
            overflowX: 'hidden'  // HIDE horizontal scrollbar
        }}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          PosBuzz Internship Task ©2026
        </Footer>
      </Layout>
    </Layout>
  );
};