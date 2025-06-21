import { DATA_USAGE_MESSAGES, DataUsageLevel } from '@/constants/dataUsage';
import { DataType } from '@/types/ranking';

/**
 * GB 용량에 따라 데이터 사용량 레벨을 계산합니다.
 */
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

/**
 * 요금제 데이터로부터 사용자 친화적인 메시지를 생성합니다.
 */
interface PlanData {
  dataType: DataType; // 🆕 기존 타입 재사용
  dataAmountGb: number | null;
}

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
