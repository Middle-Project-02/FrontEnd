import type { DataType } from '@/types/ranking';
import { getBenefitDescription } from '@/utils/ranking/benefitDescription';
import { getDataComment } from '@/utils/ranking/dataUsage';
import { getSpeedLimitDescription } from '@/utils/ranking/speedLimit';

interface PlanDetailBenefitItemProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  dataType?: DataType;
  dataAmountGb?: number | null;
  speedLimit: string | null;
}

const PlanDetailBenefitItem = ({
  title,
  content,
  icon,
  dataType,
  speedLimit,
  dataAmountGb,
}: PlanDetailBenefitItemProps) => {
  // 상세 설명 가져오기
  const getDetailedDescriptions = () => {
    // getBenefitDescription 유틸 함수 사용
    const baseDescriptions = getBenefitDescription(title, content);

    // 데이터인 경우 동적으로 추가 설명 생성
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
          const speedDescription = getSpeedLimitDescription(speedLimit);

          typeSpecificDescriptions.push(
            `${dataAmountGb}GB까지 사용 가능한 정량 요금제예요.`,
            `데이터를 모두 사용하면 ${speedDescription}`,
          );
          break;
      }

      // 기본 설명 + 데이터 코멘트 + 타입별 설명을 모두 합치기
      // DescriptionLine[] 타입을 string[]로 변환
      const baseTexts = baseDescriptions.map((desc) => desc.text);
      return [...baseTexts, dataComment, ...typeSpecificDescriptions];
    }

    // 데이터가 아닌 경우 기본 설명만 반환
    // DescriptionLine[] 타입을 string[]로 변환
    return baseDescriptions.map((desc) => desc.text);
  };
  const descriptions = getDetailedDescriptions();

  return (
    <div className="benefit-section flex px-2 py-12 gap-12">
      <div className="w-[30px] flex flex-col items-center gap-8">
        <div className="">{icon}</div>
        <div className="h-full border-bgSecondaryHover border-1 justify-center items-center" />
      </div>
      <div className="flex-1 flex flex-col gap-8">
        <p className="text-body-lg leading-tight  text-textSecondary font-semibold">{title}?</p>
        <p className="text-body-lg leading-tight text-primary font-bold">{content}</p>
        {descriptions.length > 0 && (
          <div className="">
            {descriptions.map((desc, index) => (
              <p key={index} className="text-body-md text-black leading-relaxed">
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDetailBenefitItem;
