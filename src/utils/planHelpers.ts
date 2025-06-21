import {
  getBasicBenefitDescription,
  BENEFIT_DESCRIPTIONS,
  DescriptionLine,
} from '@/constants/benefitDescriptions';
import { RankingPlanDetailResponse } from '@/types/ranking';
import { getDataComment } from '@/utils/dataUsage';

// 데이터 코멘트 계산
export const calculateDataComment = (planData: RankingPlanDetailResponse) => {
  return getDataComment({
    dataType: planData.dataType,
    dataAmountGb: planData.dataAmountGb,
  });
};

// 🆕 혜택 설명 가져오기 (DescriptionLine[] 반환)
export const getBenefitDescription = (key: string, value: string): DescriptionLine[] => {
  if (key === '기본혜택') {
    return getBasicBenefitDescription(value);
  }
  return BENEFIT_DESCRIPTIONS[key] || [];
};

// 안전한 혜택 값 가져오기
export const getBenefitValue = (allBenefits: any, key: string): string => {
  if (!allBenefits) return '';

  const benefits = allBenefits as Record<string, string | undefined>;
  return benefits[key] || '';
};

// 🆕 설명이 있는지 확인 (DescriptionLine[] 길이 체크)
export const hasDescription = (key: string, value: string): boolean => {
  const description = getBenefitDescription(key, value);
  return description.length > 0;
};
