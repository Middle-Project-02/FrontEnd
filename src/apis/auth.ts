import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';

interface LoginProps {
  memberId: string;
  password: string;
}

interface RegisterProps {
  memberId: string;
  nickname: string;
  password: string;
}

export const postLogin = async (props: LoginProps) => {
  const response = await axiosInstance.post(`${END_POINTS.LOGIN}`, {
    memberId: props.memberId,
    password: props.password,
  });

  return response.data.content;
};

export const postKakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(`${END_POINTS.KAKAOLOGIN}`, {
    code,
  });

  return response.data.content;
};

export const getNewToken = async () => {
  const response = await axiosInstance.post(`${END_POINTS.REISSUE}`);

  return response.data.content;
};

export const postRegister = async (props: RegisterProps) => {
  const response = await axiosInstance.post(`${END_POINTS.REGISTER}`, {
    memberId: props.memberId,
    nickname: props.nickname,
    password: props.password,
  });
  
export const patchFontMode = async (fontMode: boolean) => {
  const response = await axiosInstance.patch(`${END_POINTS.ADDITIONALINFORMATION}`, {
    fontMode,
  });

  return response.data.content;
};
