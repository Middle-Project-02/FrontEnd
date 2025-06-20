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
  TEMPLATES: '/templates',
  TEMPLATE_DETAIL: '/templates/:templateId',
  MAIN: '/main',
} as const;
