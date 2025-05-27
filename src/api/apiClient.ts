import axios from 'axios';

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
