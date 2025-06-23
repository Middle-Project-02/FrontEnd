import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';
import PlanItem from '@/components/ranking/PlanItem';
import PlanItemSkeleton from '@/components/skeleton/ranking/PlanItemSkeleton';
import { Button } from '@/components/ui/button';
import { getAgeGroupLabel } from '@/utils/ranking/getAgeGroupLabel';
import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';

interface Props {
  ageGroup: number;
  onBack: () => void;
}

const RankingResultSection = ({ ageGroup, onBack }: Props) => {
  const { RankingPlanListResponse, isLoading } = useRankAgeGroupQuery(ageGroup);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handlePlanClick = (planId: number) => {
    setSelectedPlanId(planId);
  };

  const handleBackToList = () => {
    setSelectedPlanId(null);
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* 헤더는 항상 렌더링 */}
      <div className="flex flex-col w-full px-30 mb-12">
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
          <h2 className="text-body-md text-textSecondary">자세한 설명은 요금제를 눌러 보세요!</h2>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="bg-bgTertiary h-full overflow-y-auto">
        <ul className="flex flex-col gap-8 px-30 my-16">
          {isLoading
            ? // 스켈레톤 로딩 상태
              Array.from({ length: 10 }, (_, index) => <PlanItemSkeleton key={index} />)
            : // 실제 데이터 렌더링
              RankingPlanListResponse?.plans.map((plan) => (
                <div key={plan.id}>
                  {selectedPlanId === plan.id ? (
                    <PlanDetailItem planId={plan.id} onBack={handleBackToList} />
                  ) : (
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
