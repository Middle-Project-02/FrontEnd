import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';

export const postSmishingMessage = (content: string) => {
  return axiosInstance.post(END_POINTS.SMISHING.MESSAGE, { content });
};
