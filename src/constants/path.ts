export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  SSE: {
    CONNECT: '/chat/connect',
    SMISHING_CONNECT: '/smishing/connect',
  },
  SMISHING: {
    CONNECT: '/smishing/connect',
    MESSAGE: '/smishing/message',
    PAGE: '/smishing',
  },
} as const;
