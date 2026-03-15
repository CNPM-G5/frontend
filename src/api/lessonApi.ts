// src/api/lessonApi.ts
import axiosClient from './axios';
// file này oke 
export interface LessonDetail {
  id: number;
  course_id: number;
  title: string;
  content: string;
  slide_url?: string | null;
  order_index: number;
  is_completed?: boolean; // Cờ đánh dấu đã hoàn thành từ Backend
}

export const lessonApi = {
  // Lấy chi tiết bài học (Kèm token để lấy cả progress nếu có)
  getLessonByIdApi: async (id: string): Promise<LessonDetail> => {
    const response = await axiosClient.get(`/lessons/${id}`);
    const raw = response.data?.data ?? response.data;
    // Backend trả về field "completed", map sang "is_completed" cho FE
    return { ...raw, is_completed: raw.completed ?? raw.is_completed ?? false };
  },

  // Đánh dấu hoàn thành bài học
  completeLessonApi: async (id: string) => {
    const response = await axiosClient.post(`/lessons/${id}/complete`);
    return response.data;
  }
};