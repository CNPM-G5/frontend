// src/api/adminApi.ts
import axiosClient from './axios';

export const adminApi = {
  // --- COURSE API ---
  createCourse: async (data: any) => {
    const response = await axiosClient.post('/courses', data);
    return response.data;
  },
  updateCourse: async (id: number | string, data: any) => {
    const response = await axiosClient.put(`/courses/${id}`, data);
    return response.data;
  },
  deleteCourse: async (id: number | string) => {
    const response = await axiosClient.delete(`/courses/${id}`);
    return response.data;
  },

  // --- LESSON API ---
  createLesson: async (data: any) => {
    const response = await axiosClient.post('/lessons', data);
    return response.data;
  },
  updateLesson: async (id: number | string, data: any) => {
    const response = await axiosClient.put(`/lessons/${id}`, data);
    return response.data;
  },
  deleteLesson: async (id: number | string) => {
    const response = await axiosClient.delete(`/lessons/${id}`);
    return response.data;
  }
};