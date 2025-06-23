import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { MyPageUserInfo, UserInformation, UserInfoUpdate } from '@/types/user';

// 내 정보 조회
export const getUserInformation = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get(END_POINTS.USERINFORMATION);
  return response.data.content;
};

// 내 정보 수정
export const patchUpdateUserInfo = async (data: UserInfoUpdate): Promise<MyPageUserInfo> => {
  const response = await axiosInstance.patch(END_POINTS.USERINFORMATION, data);
  return response.data.content;
};

// 회원 탈퇴
export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete(END_POINTS.USERINFORMATION);
};
