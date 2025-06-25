import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { MyPageUserInfo, UserInformation, UserInfoUpdate } from '@/types/user';

export const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get(END_POINTS.USERINFORMATION);
  return response.data.content;
};

export const patchUpdateUserInfo = async (data: UserInfoUpdate): Promise<MyPageUserInfo> => {
  const response = await axiosInstance.patch(END_POINTS.USERINFORMATION, data);
  return response.data.content;
};

export const sendFcmToken = async (token: string) => {
  await axiosInstance.post(END_POINTS.FCM_TOKEN, { fcmToken: token });
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete(END_POINTS.USERINFORMATION);
};
