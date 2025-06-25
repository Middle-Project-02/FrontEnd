import BenefitSection from '@/components/ranking/BenefitSection';
import PlanDetailItemSkeleton from '@/components/skeleton/ranking/PlanDetailItemSkeleton';
import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';
import { CirclePercent, Gift, Mails, Phone, Share2, TabletSmartphone, Zap } from 'lucide-react';

const getBenefitIcon = (key: string) => {
  const iconMap = {
    데이터: <Zap className="w-24 h-24 text-yellow-400" />,
    기본혜택: <Gift className="w-24 h-24 text-purple-400" />,
    음성통화: <Phone className="w-24 h-24 text-green-500" />,
    문자메시지: <Mails className="w-24 h-24 text-teal-500" />,
    '공유 데이터': <Share2 className="w-24 h-24 text-cyan-500" />,
    '5G 시그니처 가족할인': <CirclePercent className="w-24 h-24 text-red-500" />,
    스마트기기: <TabletSmartphone className="w-24 h-24 text-orange-400" />,
  };
  return iconMap[key as keyof typeof iconMap];
};

interface PlanDetailItemProps {
  planId: number;
  onBack: () => void;
}

const PlanDetailItem = ({ planId }: PlanDetailItemProps) => {
  const { rankDetailResponse, isLoading } = useRankDetailQuery(planId);

  if (isLoading) {
    return <PlanDetailItemSkeleton />;
  }

  const benefitEntries = rankDetailResponse?.allBenefits
    ? Object.entries(rankDetailResponse.allBenefits).filter(([_, value]) => value)
    : [];

  return (
    <div id="container" className="h-full flex flex-col gap-30">
      <div className="plan-name bg-primary-gradient rounded-16 shadow-shadowP2 text-white px-24 py-16 flex flex-col gap-8 mx-2">
        <p className="text-body-lg">요금제명</p>
        <p className="text-body-lg font-semibold">{rankDetailResponse?.name}</p>
        <p className="text-body-lg font-semibold text-right">{rankDetailResponse?.regularPrice}</p>
      </div>

      <div className="plan-price flex flex-col">
        <div className="flex flex-col bg-bgSecondary rounded-16 px-20 py-16 gap-12 shadow-">
          <div className="flex-1">
            <p className="text-body-md">데이터</p>
            <p className="text-body-md font-semibold">{rankDetailResponse?.allBenefits.데이터}</p>
          </div>
          <hr className="border-bgSecondaryHover rounded-16 border-1" />
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
        <p className="text-body-md px-12">{rankDetailResponse?.description}</p>
      </div>

      <div className="plan-details flex flex-col pb-24">
        <h1 className="text-body-lg font-semibold mb-12">요금제 안내</h1>
        <hr className="border-bgSecondaryHover rounded-16 border-1" />
        <div className="flex flex-col divide-y divide-borderLight">
          {benefitEntries.map(([key, value]) => (
            <BenefitSection
              key={key}
              title={key}
              content={value}
              icon={getBenefitIcon(key)}
              dataType={key === '데이터' ? rankDetailResponse?.dataType : undefined}
              dataAmountGb={key === '데이터' ? rankDetailResponse?.dataAmountGb : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailItem;
