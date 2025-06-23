import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { UserInformation } from '@/types/user';

export const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get(`${END_POINTS.USERINFORMATION}`);

  return response.data.content;
};
