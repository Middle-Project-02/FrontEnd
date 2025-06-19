import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';

const apiClient = axiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const postSmishingMessage = (content: string) => {
  return apiClient.post(END_POINTS.SMISHING.MESSAGE, { content });
};
