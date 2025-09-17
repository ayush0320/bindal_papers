import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const bannerService = {
  getBanners: () => api.get('/banners'),
};

export const productService = {
  getProducts: (category) => api.get(`/products${category ? `?category=${category}` : ''}`),
  getProduct: (id) => api.get(`/products/${id}`),
};

export const testimonialService = {
  getTestimonials: () => api.get('/testimonials'),
};

export const partnerService = {
  getPartners: () => api.get('/partners'),
};

export const contactService = {
  sendMessage: (data) => api.post('/contact', data),
};

export default api;