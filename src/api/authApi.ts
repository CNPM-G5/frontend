import api from './axios';

export const registerApi = (data: any) => api.post('/auth/register', data);
export const loginApi = (data: any) => api.post('/auth/login', data);
export const getProfileApi = () => api.get('/auth/profile');
export const changePasswordApi = (data: { oldPassword: string; newPassword: string }) =>
  api.post('/auth/change-password', data);
export const updateProfileApi = (data: { name: string }) => api.post('/auth/update-profile', data);
export const uploadAvatarApi = (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/auth/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
