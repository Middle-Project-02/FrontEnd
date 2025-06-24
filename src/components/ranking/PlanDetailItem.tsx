import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';
import { getDataComment } from '@/utils/ranking/dataUsage';
import PlanDetailItemSkeleton from '@/components/skeleton/ranking/PlanDetailItemSkeleton';
import { Zap, Gift, Phone, Share2, Smartphone, Mails, CirclePercent, Baby } from 'lucide-react';

const getBenefitIcon = (key: string) => {
  const iconMap = {
    데이터: <Zap className="w-25 h-25 text-primary" />,
    기본혜택: <Gift className="w-25 h-25 text-primary" />,
    음성통화: <Phone className="w-25 h-25 text-primary" />,
    문자메시지: <Mails className="w-25 h-25 text-primary" />,
    '공유 데이터': <Share2 className="w-25 h-25 text-primary" />,
    '5G 시그니처 가족 할인': <CirclePercent className="w-25 h-25 text-primary" />,
    스마트기기: <Baby className="w-25 h-25 text-primary" />,
  };
  return iconMap[key as keyof typeof iconMap] || <Smartphone className="w-20 h-20 text-primary" />;
};

// BenefitSection 컴포넌트
interface BenefitSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const BenefitSection = ({ title, content, icon }: BenefitSectionProps) => (
  <div className="flex flex-col gap-12 py-16">
    <div className="flex items-center gap-12">
      {icon}
      <h3 className="text-body-md font-semibold text-textPrimary">{title}</h3>
    </div>
    <p className="text-body-sm text-textSecondary leading-relaxed pl-32">{content}</p>
  </div>
);

interface PlanDetailItemProps {
  planId: number;
  onBack: () => void;
}

const PlanDetailItem = ({ planId }: PlanDetailItemProps) => {
  const { rankDetailResponse, isLoading } = useRankDetailQuery(planId);
  // 로딩 중일 때 스켈레톤 컴포넌트 반환
  if (isLoading) {
    return <PlanDetailItemSkeleton />;
  }

  const dataComment = rankDetailResponse
    ? getDataComment({
        dataType: rankDetailResponse.dataType,
        dataAmountGb: rankDetailResponse.dataAmountGb,
      })
    : '';

  const benefitEntries = rankDetailResponse?.allBenefits
    ? Object.entries(rankDetailResponse.allBenefits).filter(([_, value]) => value)
    : [];

  return (
    <div id="container" className="h-full flex flex-col gap-30">
      <div className="plan-name bg-primary-gradient rounded-16 shadow-shadowP2 text-white px-30 py-16 flex flex-col gap-8">
        <p className="text-body-lg">요금제명</p>
        <p className="text-body-lg font-semibold">{rankDetailResponse?.name}</p>
      </div>
      <div className="plan-price flex flex-col">
        <p className="text-body-lg font-semibold">{rankDetailResponse?.regularPrice}</p>
        <div className="flex flex-col bg-bgSecondary rounded-16 p-12 gap-12">
          <div className="flex-1">
            <p className="text-body-md">데이터</p>
            <p className="text-body-md font-semibold">{rankDetailResponse?.allBenefits.데이터}</p>
            <p className="text-body-sm text-textSecondary">{dataComment}</p>
          </div>
          <hr className="border-bgSecondaryHover rounded-16 border-1 " />
          <div className="flex-1">
            <p className="text-body-md">통화 • 문자</p>
            <p className="text-body-md font-semibold">
              {rankDetailResponse?.allBenefits.음성통화}
              <br />
              {rankDetailResponse?.allBenefits.문자메시지}
            </p>
          </div>
        </div>
      </div>
      <div className="plan-description">
        <p className="text-body-md">{rankDetailResponse?.description}</p>
      </div>
      <div className="plan-details">
        <h1 className="text-body-lg font-semibold">요금제 안내</h1>
        <div>
          {benefitEntries.map(([key, value], index) => (
            <div key={key}>
              <BenefitSection title={key} content={value} icon={getBenefitIcon(key)} />
              {index < benefitEntries.length - 1 && (
                <hr className="border-bgSecondaryHover border-t-1 border-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailItem;
