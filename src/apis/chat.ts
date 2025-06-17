import { axiosInstance } from '@/apis/axiosInstance';

export const sendChatMessage = async (content: string) => {
  return axiosInstance.post('/api/smishing/message', { content });
};
