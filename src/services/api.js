import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Income API
export const incomeAPI = {
  getAll: () => api.get('/incomes'),
  getById: (id) => api.get(`/incomes/${id}`),
  create: (data) => api.post('/incomes', data),
  update: (id, data) => api.put(`/incomes/${id}`, data),
  delete: (id) => api.delete(`/incomes/${id}`),
};

// Vehicle API
export const vehicleAPI = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
};

// Expense API
export const expenseAPI = {
  getAll: () => api.get('/expenses'),
  getByMonth: (month) => api.get(`/expenses/month/${month}`),
  createOrUpdate: (data) => api.post('/expenses', data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

export default api;
