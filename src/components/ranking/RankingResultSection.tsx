import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';
import PlanItem from '@/components/ranking/PlanItem';
import { Button } from '@/components/ui/button';
import { getAgeGroupLabel } from '@/utils/ranking/getAgeGroupLabel';
import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';

interface Props {
  ageGroup: number;
  onBack: () => void;
}

const RankingResultSection = ({ ageGroup, onBack }: Props) => {
  const { rankingListResponse } = useRankAgeGroupQuery(ageGroup);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handlePlanClick = (planId: number) => {
    setSelectedPlanId(planId);
  };

  const handleBackToList = () => {
    setSelectedPlanId(null);
  };

  if (!rankingListResponse) return <p>불러오는 중...</p>;

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex flex-col w-full px-30 mb-12 ">
        <Button
          className="flex items-center py-8 pr-8 gap-8 w-fit"
          variant="ghost"
          size="md"
          onClick={onBack}
        >
          <ChevronLeft />
          <span className="font-medium">뒤로가기</span>
        </Button>
        <div className="flex flex-col">
          <h1 className="text-heading-h2 font-bold">
            {getAgeGroupLabel(ageGroup)} 인기 요금제 20위
          </h1>
          <h2 className="text-body-md text-textSecondary ">자세한 설명은 요금제를 눌러 보세요!</h2>
        </div>
      </div>
      <div className="bg-bgTertiary h-full overflow-y-auto">
        <ul className="flex flex-col gap-8 px-30 my-16">
          {rankingListResponse.plans.map((plan) => (
            <div key={plan.id}>
              {selectedPlanId === plan.id ? (
                // 🆕 선택된 요금제는 상세 정보 표시
                <PlanDetailItem planId={plan.id} onBack={handleBackToList} />
              ) : (
                // 🆕 선택되지 않은 요금제는 일반 아이템 표시
                <PlanItem plan={plan} onClick={handlePlanClick} />
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingResultSection;
