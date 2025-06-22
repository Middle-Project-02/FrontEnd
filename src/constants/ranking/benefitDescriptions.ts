import type { DescriptionLine } from '@/types/ranking';

export const BENEFIT_DESCRIPTIONS: Record<string, DescriptionLine[]> = {
  데이터: [{ text: '인터넷이나 유튜브, 카톡을 쓸 수 있는 데이터 양을 GB(기가바이트)라 해요.' }],
  '공유 데이터': [
    { text: '테더링', isBold: true },
    { text: '데이터 나눠쓰기로, 내 휴대폰에서 와이파이 기능' },
    { text: '쉐어링', isBold: true },
    { text: '내 명의로 5G 요금제에 가입한 태블릿, 스마트 워치에 데이터 나눠주기' },
  ],
  스마트기기: [
    {
      text: '내 명의의 태블릿/워치 등 휴대폰을 제외한 스마트기기 2대 월정액을 1대당 최대 11,000원 할인 받을 수 있어요.',
    },
  ],
  '참 쉬운 가족데이터': [
    { text: '가족 결합 구성원 중 5G 프리미어 슈퍼, 5G 슈퍼 플래티넘 요금제를 이용하는 고객이' },
    { text: '5G 라이트 청소년, 5G 시니어 요금제를 이용하는 가족에게 데이터를 공유' },
  ],
  '5G 시그니처 가족할인': [
    { text: '18세 이하 자녀가 만 20세가 되는 날까지' },
    { text: '휴대폰 1개 월정액을 최대 33,000원 할인혜택' },
  ],
};
