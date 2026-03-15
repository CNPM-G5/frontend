// src/api/progressApi.ts
import axiosClient from './axios';

export interface CourseProgress {
  total: number;
  completed: number;
  percentage: number;
  // Backend có thể trả về mảng các ID bài học đã hoàn thành để FE biết bài nào đánh dấu ✅
  completed_lesson_ids?: number[]; 
}

export const progressApi = {
  getCourseProgressApi: async (courseId: string): Promise<CourseProgress> => {
    const response = await axiosClient.get(`/progress/${courseId}`);
    
    // Đề phòng Backend bọc dữ liệu trong biến data
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  }
};