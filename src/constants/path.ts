export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_DETAIL: '/notifications/:id',
  SSE: {
    CONNECT: '/chat/connect',
  },
  HOME: '/home',
  CHAT: '/chat',
  MYPAGE: '/mypage',
} as const;
