import { axiosInstance } from './axiosInstance';
import { PATH } from '@/constants/path';

const apiClient = axiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const postSmishingMessage = (content: string) => {
  return apiClient.post(PATH.SMISHING.MESSAGE, { content });
};
