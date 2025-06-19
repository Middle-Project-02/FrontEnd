export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const END_POINTS = {
  LOGIN: 'auth/login',
  REISSUE: 'auth/reissue',
  USERINFORMATION: 'members/me',
  NOTIFICATION: {
    GET_ALL: 'notifications',
    GET_DETAIL: (id: string) => `notifications/${id}`,
  },
  TEMPLATE: {
    GET_ALL: 'templates',
    GET_DETAIL: (id: number) => `templates/detail/${id}`,
    SAVE: 'templates',
    DELETE: (id: number) => `templates/${id}`,
  },
} as const;

export const NETWORK_TIMEOUT = 30000;

export const HTTP_STATUS_CODE = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const AUTH_ERROR_CODE = {
  EXPIRED_ACCESS_TOKEN: 40116,
  EXPIRED_REFRESH_TOKEN: 40118,
} as const;
