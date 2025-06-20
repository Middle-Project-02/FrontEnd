import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';

export const sendChatMessage = (content: string) => {
  return axiosInstance.post(END_POINTS.CHAT_MESSAGE, { content });
};

export const createChangePlanGuideTemplate = () => {
  return axiosInstance.post(END_POINTS.CHAT_TEMPLATE);
};
