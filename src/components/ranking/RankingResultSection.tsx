import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';
import { getAgeGroupLabel } from '@/constants/ageGroup';
import PlanItem from '@/components/ranking/PlanItem';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';
import { useState } from 'react';

interface Props {
  ageGroup: number;
  onBack: () => void;
}

const RankingResultSection = ({ ageGroup, onBack }: Props) => {
  const { RankingPlanListResponse } = useRankAgeGroupQuery(ageGroup);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handlePlanClick = (planId: number) => {
    setSelectedPlanId(planId);
  };

  const handleBackToList = () => {
    setSelectedPlanId(null);
  };

  if (!RankingPlanListResponse) return <p>불러오는 중...</p>;

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex flex-col w-full px-30 mb-12 ">
        <button onClick={onBack} className="text-left text-primary font-bold">
          ← 다시 선택
        </button>
        <div className="flex flex-col">
          <h1 className="text-heading-h2 font-bold">
            {getAgeGroupLabel(ageGroup)} 인기 요금제 20위
          </h1>
          <h2 className="text-body-md text-textSecondary ">
            자세한 설명은 요금제를 터치 해보세요!
          </h2>
        </div>
      </div>
      <div className="bg-bgTertiary h-full overflow-y-auto">
        <ul className="flex flex-col gap-8 px-30 my-16">
          {RankingPlanListResponse.plans.map((plan) => (
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
