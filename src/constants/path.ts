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
} as const;
