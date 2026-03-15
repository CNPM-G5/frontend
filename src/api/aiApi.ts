// src/api/aiApi.ts
import axiosClient from './axios';

export interface AiChatResponse {
  reply: string;
  degraded?: boolean; // Backend trả về true nếu AI bị lỗi/quá tải
  message? : string;
}

export const aiApi = {
  chatWithAiApi: async (lessonId: number | string, message: string): Promise<AiChatResponse> => {
    // Gọi API POST theo đúng đặc tả của Tuân/Hiếu
    const response = await axiosClient.post('/ai/chat', {
      lessonId,
      message
    });
    return response.data;
  }
};