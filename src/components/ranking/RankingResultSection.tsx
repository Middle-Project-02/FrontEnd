import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';
import PlanItem from '@/components/ranking/PlanItem';
import PlanItemSkeleton from '@/components/skeleton/ranking/PlanItemSkeleton';
import { Button } from '@/components/ui/button';
import { getAgeGroupLabel } from '@/utils/ranking/getAgeGroupLabel';
import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';
import type { RankingPlanSummary } from '@/types/ranking';
import { PATH } from '@/constants/path';

interface Props {
  ageGroup: number;
  onBack: () => void;
}

const RankingResultSection = ({ ageGroup, onBack }: Props) => {
  const { RankingPlanListResponse, isLoading } = useRankAgeGroupQuery(ageGroup);
  const navigate = useNavigate();
  // 요금제 클릭 시 상세 페이지로 이동 (navigate 사용 예정)
  const handlePlanClick = (planId: number) => {
    navigate(PATH.RANKING.DETAIL_PATH(ageGroup, planId));
  };

  // 로딩 중 스켈레톤 UI 렌더링
  const renderSkeletonItems = () => {
    return Array.from({ length: 10 }, (_, index) => <PlanItemSkeleton key={index} />);
  };

  // 개별 요금제 아이템 렌더링
  const renderPlanItem = (plan: RankingPlanSummary) => {
    // 1위 요금제라면 큰 카드와 함께 표시
    if (plan.rank === 1) {
      return (
        <div className="flex gap-20 h-full py-24">
          <div className="flex-[5]">
            <FirstPlanCard plan={plan} />
          </div>
          <div className="flex-[4] h-full">
            <PlanItem plan={plan} onClick={handlePlanClick} />
          </div>
        </div>
      );
    }

    // 일반 요금제는 기본 아이템만 표시
    return (
      <div className="flex gap-20 h-full pt-8">
        <div className="flex-[2]">
          <RegulerPlanCard plan={plan} />
        </div>
        <div className="flex-[3] h-full">
          <PlanItem plan={plan} onClick={handlePlanClick} />
        </div>
      </div>
    );
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
          <h1 className="text-heading-h3 font-bold">
            {getAgeGroupLabel(ageGroup)} 인기 요금제 20위
          </h1>
          <h2 className="text-body-md text-textSecondary">자세한 설명은 요금제를 눌러 보세요!</h2>
        </div>
      </div>

      {/* 요금제 목록 */}
      <div className="overflow-y-auto no-scrollbar pb-24">
        <ul className="flex flex-col px-30 gap-16 h-full">
          {isLoading
            ? // 스켈레톤 로딩 상태
              Array.from({ length: 10 }, (_, index) => <PlanItemSkeleton key={index} />)
            : // 실제 데이터 렌더링
              RankingPlanListResponse?.plans.map((plan) => (
                <div key={plan.id}>{renderPlanItem(plan)}</div>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingResultSection;
