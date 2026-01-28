// frontend/src/api/api.ts
import axios from 'axios';

// 1. Dynamic URL: Uses Vercel's environment variable in production, localhost in dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

// 2. Token Interceptor: Automatically attaches the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- API CALLS ---

export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data;
};

export const createProduct = async (data: any) => {
  return api.post('/products', data);
};

export const createSale = async (data: { productId: number; quantity: number }) => {
  return api.post('/sales', data);
};

export const getSales = async () => {
  const res = await api.get('/sales');
  return res.data;
};