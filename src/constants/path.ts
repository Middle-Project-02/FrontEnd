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
    INTRO: '/smishing/intro',
  },
  HOME: '/home',
  CHAT: '/chat',
  MYPAGE: '/mypage',
  TEMPLATES: '/templates',
  TEMPLATE_DETAIL: '/templates/detail/:id',
  MAIN: '/main',
  QUIZ: {
    PAGE: '/quiz',
    INTRO: '/quiz/intro',
  },
  RANKING: {
    AGE_SELECT: '/ranking',
    LIST: '/ranking/:ageGroup',
    DETAIL: '/ranking/:ageGroup/:id',

    LIST_PATH: (ageGroup: number) => `/ranking/${ageGroup}`,
    DETAIL_PATH: (ageGroup: number, id: number) => `/ranking/${ageGroup}/${id}`,
  },
  FONTMODE: '/fontmode',
  REDIRECT: '/redirect',
  SIGNUP: '/signup',
  SERVER_ERROR: '/500',
  NOT_FOUND: '/404',
} as const;
