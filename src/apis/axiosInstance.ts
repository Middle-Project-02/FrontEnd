import axios from 'axios';
import { BASE_URL, NETWORK_TIMEOUT } from '@/constants/api';
import { handleAPIError } from '@/apis/axiosInterceptors';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: NETWORK_TIMEOUT,
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => response, handleAPIError);
