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
  SMISHING: {
    CONNECT: '/smishing/connect',
    MESSAGE: '/smishing/message',
  },
  CHAT: {
    CONNECT: 'chat/connect',
  },
  CHAT_MESSAGE: 'chat/message',
  CHAT_TEMPLATE: 'chat/template',
  QUIZ: {
    RANDOM: '/quiz/random',
    SUBMIT: '/quiz/submit',
    SCORE: '/quiz/score',
  },
  KAKAOLOGIN: 'auth/login/kakao',
  REGISTER: 'auth/register',
  ADDITIONALINFORMATION: 'auth/firstLogin',
  RANKING: {
    AGE_GROUP: (ageGroup: number) => `ranking?ageGroup=${ageGroup}`,
    DETAIL: (id: number) => `ranking/${id}`,
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

export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
