// components/plan/BenefitSection.tsx
import { DataType } from '@/types/ranking';
import { getDataComment } from '@/utils/ranking/dataUsage';

// 혜택별 상세 설명 상수
const BENEFIT_DESCRIPTIONS: Record<string, string[]> = {
  데이터: [
    '인터넷이나 유튜브, 카톡을 쓸 수 있는 데이터 양을 GB(기가바이트)라 해요.',
    '데이터를 모두 사용하면 속도가 느려져요.',
  ],
  '공유 데이터': [
    '테더링: 데이터 나눠쓰기로, 내 휴대폰에서 와이파이 기능',
    '쉐어링: 내 명의로 5G 요금제에 가입한 태블릿, 스마트 워치에 데이터 나눠주기',
  ],
  스마트기기: [
    '내 명의의 태블릿/워치 등 휴대폰을 제외한 스마트기기 2대 월정액을 1대당 최대 11,000원 할인 받을 수 있어요.',
  ],
  음성통화: [
    '일반적인 음성 통화 사용 시에는 사용량 제한없이 무제한 무료로 이용해요.',
    '부가 통화, 영상통화는 300분 제한이 있어요.',
  ],
  문자메시지: [
    'SMS, MMS 문자 무제한 무료 발송 가능해요.',
    '단, 스팸 문자나 대량 발송은 제한될 수 있어요.',
  ],
};

interface BenefitSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  dataType?: DataType;
  dataAmountGb?: number | null;
}

const BenefitSection = ({ title, content, icon, dataType, dataAmountGb }: BenefitSectionProps) => {
  // 상세 설명 가져오기
  const getDetailedDescriptions = () => {
    // 데이터인 경우 동적으로 생성
    if (title === '데이터' && dataType && dataAmountGb !== undefined) {
      const dataComment = getDataComment({ dataType, dataAmountGb });

      // DataType별 추가 설명
      const typeSpecificDescriptions = [];

      switch (dataType) {
        case 'UNLIMITED':
          typeSpecificDescriptions.push(
            '무제한 데이터로 걱정 없이 사용하세요!',
            '속도 제한 없이 계속 이용 가능해요.',
          );
          break;
        case 'DAILY':
          typeSpecificDescriptions.push(
            '매일 5GB씩 제공되는 일일 데이터 요금제예요.',
            '하루 사용량을 넘어도 다음 날 새롭게 시작돼요.',
          );
          break;
        case 'CHARGED_PER_KB':
          typeSpecificDescriptions.push(
            '기본 데이터 제공 없이 사용한 만큼만 요금이 부과돼요.',
            '데이터 사용량을 꼼꼼히 관리하시는 분께 적합해요.',
          );
          break;
        case 'FIXED':
          typeSpecificDescriptions.push(
            `${dataAmountGb}GB까지 사용 가능한 정량 요금제예요.`,
            '데이터를 모두 사용하면 속도가 1Mbps로 제한돼요.',
            '데이터 모두 테더링에 사용할 수 있어요.',
          );
          break;
      }

      return [dataComment, ...typeSpecificDescriptions];
    }

    // 상수에서 가져오기
    return BENEFIT_DESCRIPTIONS[title] || [];
  };

  const descriptions = getDetailedDescriptions();

  return (
    <div className="py-20">
      <div className="flex items-center gap-12 mb-16">
        {icon}
        <h3 className="text-body-md font-semibold text-textPrimary">{title}</h3>
      </div>

      <div className="pl-32">
        {/* 기본 내용 */}
        <p className="text-body-md font-medium text-textPrimary mb-12">{content}</p>

        {/* 상세 설명 */}
        {descriptions.length > 0 && (
          <div className="space-y-8">
            {descriptions.map((desc, index) => (
              <p key={index} className="text-body-sm text-textSecondary leading-relaxed">
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitSection;
