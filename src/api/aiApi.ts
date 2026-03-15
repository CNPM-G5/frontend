import axiosClient from './axios';

export interface AiResponse {
  message: string;
  reply?: string;
  hasContext: boolean;
  degraded: boolean;
  lessonId?: number | null;
  courseId?: number | null;
}

export const chatWithAiApi = async (
  message: string,
  lessonId?: number | string,
  courseId?: number
): Promise<AiResponse> => {
  const response = await axiosClient.post('/ai/chat', { message, lessonId, courseId });
  return response.data.data;
};

// Object-style export cho AiChat.tsx
export const aiApi = {
  chatWithAiApi,
};
