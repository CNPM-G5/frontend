import axiosClient from './axios';

export const chatWithAiApi = async (message: string, lessonId?: number, courseId?: number) => {
  const response = await axiosClient.post('/ai/chat', { message, lessonId, courseId });
  return response.data.data;
};
