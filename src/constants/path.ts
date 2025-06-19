export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_DETAIL: '/notifications/:id',
  SSE: {
    CONNECT: '/chat/connect',
  },
  SMISHING: 'smishing',
  HOME: '/home',
  CHAT: '/chat',
  MYPAGE: '/mypage',
  RANKING: '/ranking',
} as const;
