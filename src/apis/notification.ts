import { NotificationDetailResponse, NotificationSimpleResponse } from '@/types/notification';
import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';

export const getAllNotifications = async (): Promise<NotificationSimpleResponse[]> => {
  const response = await axiosInstance.get(`${END_POINTS.NOTIFICATION.GET_ALL}`);

  return response.data.content;
};

export const getNotificationDetail = async (id: string): Promise<NotificationDetailResponse> => {
  const response = await axiosInstance.get(`${END_POINTS.NOTIFICATION.GET_DETAIL(id)}`);

  return response.data.content;
};
