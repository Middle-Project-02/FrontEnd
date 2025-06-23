import { PATH } from '@/constants/path';
import { Ranking, Template, Notice, Quiz, User, LandingDog, GlassesDog } from '@/assets/svg';

export const CATEGORY_LIST = [
  { title: '요금제 추천 챗봇', icon: 'LandingDog' },
  { title: '요금제 순위', icon: 'Ranking' },
  { title: '템플릿 보기', icon: 'Template' },
  { title: '알림장', icon: 'Notice' },
  { title: '스미싱 판별', icon: 'GlassesDog' },
  { title: '스미싱 퀴즈', icon: 'Quiz' },
  { title: '내 정보', icon: 'User' },
] as const;

export const REQUIRED_LOGIN = [
  '요금제 추천 챗봇',
  '템플릿 보기',
  '알림장',
  '스미싱 판별',
  '내 정보',
];

export const ROUTE_MAP = {
  '요금제 추천 챗봇': PATH.CHAT,
  '요금제 순위': PATH.RANKING,
  '템플릿 보기': PATH.TEMPLATES,
  알림장: PATH.NOTIFICATIONS,
  '스미싱 판별': PATH.SMISHING.INTRO,
  '스미싱 퀴즈': PATH.QUIZ.INTRO,
  '내 정보': PATH.MYPAGE,
} as const;

export const ICON_MAP = {
  Ranking,
  Template,
  Notice,
  Quiz,
  User,
  LandingDog,
  GlassesDog,
} as const;
