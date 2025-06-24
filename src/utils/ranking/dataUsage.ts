// utils/ranking/dataUsage.ts
import type { DataUsageLevel, PlanData } from '@/types/ranking';
import { DATA_USAGE_MESSAGES } from '@/constants/ranking/dataUsage';

// 데이터 용량에 따른 레벨 계산
export function calculateDataUsageLevel(dataAmountGb: number | null): DataUsageLevel {
  if (!dataAmountGb || dataAmountGb === null) {
    return 'UNKNOWN';
  }

  if (dataAmountGb <= 10) {
    return 'LEVEL_1';
  } else if (dataAmountGb <= 30) {
    return 'LEVEL_2';
  } else if (dataAmountGb <= 60) {
    return 'LEVEL_3';
  } else if (dataAmountGb <= 100) {
    return 'LEVEL_4';
  } else if (dataAmountGb > 100) {
    return 'LEVEL_5';
  } else {
    return 'UNKNOWN';
  }
}

// 데이터 타입에 따른 코멘트 생성
export function getDataComment(planData: PlanData): string {
  const { dataType, dataAmountGb } = planData;

  switch (dataType) {
    case 'UNLIMITED':
      return '데이터 걱정 없이 사용할 수 있어요!';
    case 'DAILY':
      return '매일 5GB씩! 넉넉하게 사용 가능해요';
    case 'CHARGED_PER_KB':
      return '데이터 기본 제공 없음, 쓴 만큼 요금이 나와요';
    case 'FIXED':
      const level = calculateDataUsageLevel(dataAmountGb);
      return DATA_USAGE_MESSAGES[level];
    default:
      return '데이터 정보 없음';
  }
}
