import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table, Button, Modal, Form, Input, InputNumber, Card, Statistic, Row, Col, Tag, message, Typography
} from 'antd';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { getProducts, createProduct, createSale, getSales } from './api/api';
import { Login } from './pages/Login'; 
import { MainLayout } from './components/MainLayout'; // <--- IMPORT THIS

const { Title, Text } = Typography;

function App() {
  const queryClient = useQueryClient();
  
  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [activeMenu, setActiveMenu] = useState('dashboard'); 
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [form] = Form.useForm();
  const [saleForm] = Form.useForm();

  // --- QUERIES ---
  const { data: products, isLoading: loadingProducts } = useQuery({ 
    queryKey: ['products'], 
    queryFn: getProducts,
    enabled: isAuthenticated 
  });

  const { data: sales, isLoading: loadingSales } = useQuery({ 
    queryKey: ['sales'], 
    queryFn: getSales,
    enabled: isAuthenticated 
  });

  // --- MUTATIONS ---
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success('Product created successfully');
      setIsProductModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => message.error('Failed to create product'),
  });

  const sellMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      message.success('Sale recorded!');
      setIsSaleModalOpen(false);
      saleForm.resetFields();
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Sale failed');
    }
  });

  const handleSell = (values: any) => {
    sellMutation.mutate({ productId: selectedProduct.id, quantity: values.quantity });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    message.info('Logged out successfully');
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- CALCULATIONS & COLUMNS ---
  const totalStock = products?.reduce((acc: number, curr: any) => acc + curr.stock_quantity, 0) || 0;
  const totalRevenue = sales?.reduce((acc: number, curr: any) => acc + Number(curr.totalPrice), 0) || 0;

  const productColumns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (val: any) => <Text type="success">${val}</Text> },
    { title: 'Stock Status', dataIndex: 'stock_quantity', key: 'stock', render: (stock: number) => (
        <Tag color={stock === 0 ? 'red' : stock < 5 ? 'orange' : 'green'}>{stock === 0 ? 'Out of Stock' : `${stock} Units`}</Tag>
      ) },
    { title: 'Action', key: 'action', render: (_: any, record: any) => (
        <Button type="primary" size="small" icon={<ShoppingCartOutlined />} disabled={record.stock_quantity < 1} onClick={() => { setSelectedProduct(record); setIsSaleModalOpen(true); }}>Sell</Button>
      ) },
  ];

  const salesColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Product', dataIndex: ['product', 'name'], key: 'product' },
    { title: 'Qty Sold', dataIndex: 'quantity', key: 'qty' },
    { title: 'Total Revenue', dataIndex: 'totalPrice', key: 'total', render: (val: any) => <b>${val}</b> },
    { title: 'Time', dataIndex: 'createdAt', key: 'date', render: (val: string) => <Text type="secondary">{new Date(val).toLocaleString()}</Text> },
  ];

  // --- VIEW RENDERER ---
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <Statistic title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Total Revenue</span>} value={totalRevenue} prefix="$" valueStyle={{ color: '#fff' }} />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' }}>
                  <Statistic title={<span style={{ color: '#555' }}>Products in Stock</span>} value={totalStock} valueStyle={{ color: '#333' }} />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card bordered={false} style={{ background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' }}>
                  <Statistic title={<span style={{ color: '#333' }}>Total Orders</span>} value={sales?.length || 0} valueStyle={{ color: '#333' }} />
                </Card>
              </Col>
            </Row>

            <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
              <Title level={4}>Overview</Title>
              <Row gutter={24}>
                <Col span={12}>
                   <Title level={5}>Top Products</Title>
                   <Table dataSource={products?.slice(0, 5)} columns={productColumns} rowKey="id" pagination={false} size="small" />
                </Col>
                <Col span={12}>
                   <Title level={5}>Recent Transactions</Title>
                   <Table dataSource={sales?.slice(0, 5)} columns={salesColumns} rowKey="id" pagination={false} size="small" />
                </Col>
              </Row>
            </div>
          </>
        );
      case 'inventory':
        return (
          <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Title level={4}>Inventory Management</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsProductModalOpen(true)}>Add New Product</Button>
            </div>
            <Table dataSource={products} columns={productColumns} rowKey="id" loading={loadingProducts} pagination={{ pageSize: 8 }} />
          </div>
        );
      case 'sales':
        return (
          <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
            <Title level={4} style={{ marginBottom: 20 }}>Sales History</Title>
            <Table dataSource={sales} columns={salesColumns} rowKey="id" loading={loadingSales} pagination={{ pageSize: 10 }} />
          </div>
        );
      default:
        return null;
    }
  };

  // --- RETURN WITH MAIN LAYOUT ---
  return (
    <MainLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu} onLogout={handleLogout}>
      
      {renderContent()}

      {/* MODALS */}
      <Modal title="Add New Product" open={isProductModalOpen} onCancel={() => setIsProductModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={(values) => addProductMutation.mutate(values)}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}> <Input placeholder="e.g. Gaming Laptop" /> </Form.Item>
          <Form.Item name="sku" label="SKU Code" rules={[{ required: true }]}> <Input placeholder="e.g. GL-001" /> </Form.Item>
          <Row gutter={16}>
            <Col span={12}> <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}> <InputNumber style={{ width: '100%' }} min={0} /> </Form.Item> </Col>
            <Col span={12}> <Form.Item name="stock_quantity" label="Initial Stock" rules={[{ required: true }]}> <InputNumber style={{ width: '100%' }} min={1} /> </Form.Item> </Col>
          </Row>
        </Form>
      </Modal>

      <Modal title={`Sell Item: ${selectedProduct?.name}`} open={isSaleModalOpen} onCancel={() => setIsSaleModalOpen(false)} onOk={() => saleForm.submit()}>
        <Form form={saleForm} layout="vertical" onFinish={handleSell}>
           <p>Stock Available: <b>{selectedProduct?.stock_quantity}</b></p>
           <Form.Item name="quantity" label="Quantity to Sell" rules={[{ required: true }]}> <InputNumber style={{ width: '100%' }} min={1} max={selectedProduct?.stock_quantity} /> </Form.Item>
        </Form>
      </Modal>

    </MainLayout>
  );
}

export default App;