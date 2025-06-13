import type { AxiosError } from 'axios';
import { HTTPError } from '@/apis/HTTPError';
import { axiosInstance } from '@/apis/axiosInstance';
import { getNewToken } from '@/apis/auth';
import { HTTP_STATUS_CODE, AUTH_ERROR_CODE } from '@/constants/api';
import { PATH } from '@/constants/path';

interface ErrorResponse {
  status: number;
  code?: number;
  content?: null;
  message?: string;
}

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  const originalRequest = error.config;

  if (!error.response || !originalRequest)
    throw new Error('네트워크 요청 실패 혹은 요청 객체 없음');

  const { data, status } = error.response;

  if (
    status === HTTP_STATUS_CODE.UNAUTHORIZED &&
    data.code === AUTH_ERROR_CODE.EXPIRED_ACCESS_TOKEN
  ) {
    await getNewToken();
    return axiosInstance(originalRequest);
  }

  if (
    status === HTTP_STATUS_CODE.UNAUTHORIZED &&
    data.code === AUTH_ERROR_CODE.EXPIRED_REFRESH_TOKEN
  ) {
    window.location.replace(PATH.LOGIN);
  }

  throw error;
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) throw error;

  const { data, status } = error.response;

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  throw new HTTPError(status, data.code, data.content, data.message);
};
