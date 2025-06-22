export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_DETAIL: '/notifications/:id',
  SSE: {
    CONNECT: '/chat/connect',
  },
  SMISHING: {
    PAGE: '/smishing',
    INTRO: '/intro',
  },
  HOME: '/home',
  CHAT: '/chat',
  MYPAGE: '/mypage',
  MAIN: '/main',
  QUIZ: {
    PAGE: '/quiz',
    INTRO: '/quiz/intro',
  },
  FONTMODE: '/fontmode',
  REDIRECT: '/redirect',
  SIGNUP: '/signup',
} as const;
