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
    CONNECT: '/smishing/connect',
    MESSAGE: '/smishing/message',
    PAGE: '/smishing',
  },
  HOME: '/home',
  CHAT: '/chat',
  MYPAGE: '/mypage',
} as const;
