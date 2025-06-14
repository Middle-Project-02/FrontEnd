import axios from 'axios';
import { BASE_URL } from '@/constants';

export const apiClient = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
});
