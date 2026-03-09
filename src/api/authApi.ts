import api from './axios';

// chua cac ham goi thang len backend
export const registerApi = (data: any) => api.post('/auth/register', data);
export const loginApi = (data: any) => api.post('/auth/login', data);
export const getProfileApi = () => api.get('/auth/profile');