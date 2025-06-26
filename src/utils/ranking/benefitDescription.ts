export const BENEFIT_DESCRIPTIONS: Record<string, { text: string }[]> = {
  '공유 데이터': [
    { text: '테더링이란?' },
    { text: '내 휴대폰 데이터를 써서 다른 기기에서도 와이파이를 쓸 수 있어요.' },
    { text: '쉐어링이란?' },
    { text: '내 명의로 5G 요금제에 가입한 태블릿, 스마트 워치에 데이터 나눠줄 수 있어요.' },
  ],
  스마트기기: [
    {
      text: '내 명의의 태블릿/워치 등 스마트기기 2대 월정액을 1대 당 최대 11,000원 할인 받을 수 있어요.',
    },
  ],
  음성통화: [
    { text: '일반적인 음성 통화 사용 시에는 사용량 제한없이 무제한 무료로 이용해요.' },
    { text: '부가 통화, 영상통화는 300분 제한이 있어요.' },
  ],
  문자메시지: [
    { text: 'SMS, MMS 문자 무제한 무료 발송 가능해요.' },
    { text: '단, 스팸 문자나 대량 발송은 제한될 수 있어요.' },
  ],
};

// 기본혜택 처리 함수 (기존 로직 유지)
const getBasicBenefitDescription = (benefitValue: string): { text: string }[] => {
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

// 통합된 혜택 설명 함수
export const getBenefitDescription = (key: string, value: string): { text: string }[] => {
  if (key === '기본혜택') {
    return getBasicBenefitDescription(value);
  }

  return BENEFIT_DESCRIPTIONS[key] || [];
};
