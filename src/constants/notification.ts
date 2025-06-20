import { Impact, Issue, Solution } from '@/assets/svg';

export const NOTIFICATION_DETAIL_SECTIONS = [
  {
    key: 'issue',
    title: '무슨 일이 일어났나요?',
    icon: Issue,
    alt: 'issue',
  },
  {
    key: 'impact',
    title: '어떤 영향이 있나요?',
    icon: Impact,
    alt: 'impact',
  },
  {
    key: 'solution',
    title: '어떻게 대응해야 하나요?',
    icon: Solution,
    alt: 'solution',
  },
] as const;
