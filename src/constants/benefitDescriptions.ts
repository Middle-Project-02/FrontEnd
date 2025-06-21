// 🆕 타입을 export해서 다른 곳에서 사용 가능하게
export interface DescriptionLine {
  text: string;
  isBold?: boolean;
  isSecondary?: boolean;
  className?: string;
}

export const BENEFIT_DESCRIPTIONS: Record<string, DescriptionLine[]> = {
  데이터: [{ text: '인터넷이나 유튜브, 카톡을 쓸 수 있는 데이터 양을 GB(기가바이트)라 해요.' }],
  '공유 데이터': [
    { text: '테더링', isBold: true },
    { text: '데이터 나눠쓰기로, 내 휴대폰에서 와이파이 기능' },
    { text: '쉐어링', isBold: true },
    { text: '내 명의로 5G 요금제에 가입한 태블릿, 스마트 워치에 데이터 나눠주기' },
  ],
  '스마트 기기': [{ text: '123' }],
  '참 쉬운 가족데이터': [
    { text: '가족 결합 구성원 중 5G 프리미어 슈퍼, 5G 슈퍼 플래티넘 요금제를 이용하는 고객이' },
    { text: '5G 라이트 청소년, 5G 시니어 요금제를 이용하는 가족에게 데이터를 공유' },
  ],
  '5G 시그니처 가족할인': [
    { text: '18세 이하 자녀가 만 20세가 되는 날까지' },
    { text: '휴대폰 1개 월정액을 최대 33,000원 할인혜택' },
  ],
};

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
