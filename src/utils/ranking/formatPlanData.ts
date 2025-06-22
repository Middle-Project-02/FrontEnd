import type { RankingPlanDetailResponse } from '@/types/ranking';
import { getDataComment } from '@/utils/ranking/calculateDataUsage';
import { getBenefitDescription } from '@/utils/ranking/getBenefitDescription';

// 데이터 코멘트 계산
export const calculateDataComment = (planData: RankingPlanDetailResponse) => {
  return getDataComment({
    dataType: planData.dataType,
    dataAmountGb: planData.dataAmountGb,
  });
};

// 안전한 혜택 값 가져오기
export const getBenefitValue = (allBenefits: any, key: string): string => {
  if (!allBenefits) return '';

  const benefits = allBenefits as Record<string, string | undefined>;
  return benefits[key] || '';
};

// 설명이 있는지 확인
export const hasDescription = (key: string, value: string): boolean => {
  const description = getBenefitDescription(key, value);
  return description.length > 0;
};
