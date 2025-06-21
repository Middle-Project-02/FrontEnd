import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINTS } from '@/constants/api';

interface LoginProps {
  memberId: string;
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
