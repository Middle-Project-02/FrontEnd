import type { DataUsageLevel } from '@/types/ranking';

// 레벨별 메시지 (상수)
export const DATA_USAGE_MESSAGES: Record<DataUsageLevel, string> = {
  LEVEL_1: '전화·문자, 간단한 검색만 가능해요',
  LEVEL_2: '매일 유튜브 30분, 뉴스 보기 가능해요',
  LEVEL_3: '영상·음악·게임 걱정 없이 즐길 수 있어요',
  LEVEL_4: '스마트폰으로 모든 걸 해결할 수 있어요',
  LEVEL_5: '데이터 걱정 없이 마음껏 사용할 수 있어요',
  UNKNOWN: '데이터 정보 없음',
};
