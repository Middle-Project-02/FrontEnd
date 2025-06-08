import type { AxiosError } from 'axios';
import { HTTPError } from '@/apis/HTTPError';
import { HTTP_STATUS_CODE } from '@/constants/api';

interface ErrorResponse {
  status: number;
  code?: number;
  content?: null;
  message?: string;
}

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) throw error;

  const { data, status } = error.response;

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  throw new HTTPError(status, data.code, data.content, data.message);
};
