import type { DescriptionLine } from '@/types/ranking';
import { BENEFIT_DESCRIPTIONS } from '@/constants/ranking/benefitDescriptions';

export const getBasicBenefitDescription = (benefitValue: string): DescriptionLine[] => {
  if (benefitValue.includes('실버지킴이')) {
    return [{ text: '1~3시간 마다 문자메시지로 내 위치를 보호자에게 알려주는 서비스' }];
  } else if (
    benefitValue.includes('U⁺') ||
    benefitValue.includes('U+') ||
    benefitValue.includes('U+ ')
  ) {
    return [{ text: '실시간 채널 및 25만여 편의 영화, TV 다시보기 등을 시청 가능' }];
  } else {
    console.log('매칭되지 않은 기본혜택:', benefitValue);
    return [{ text: '요금제에 포함된 기본적인 혜택 서비스입니다' }];
  }
};

export const getBenefitDescription = (key: string, value: string): DescriptionLine[] => {
  if (key === '기본혜택') {
    return getBasicBenefitDescription(value);
  }
  return BENEFIT_DESCRIPTIONS[key] || [];
};
