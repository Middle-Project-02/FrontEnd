import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/common/BackButton';
import FirstPlanCard from '@/components/ranking/FirstPlanCard';
import RankingListInfo from '@/components/ranking/RankingListInfo';
import RegulerPlanCard from '@/components/ranking/RegulerPlanCard';
import RankingListSkeleton from '@/components/skeleton/ranking/RankingListSkeleton';
import { PATH } from '@/constants/path';
import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';
import type { RankingPlanSummary } from '@/types/ranking';
import { getAgeGroupLabel } from '@/utils/ranking/getAgeGroupLabel';

interface Props {
  ageGroup: number;
  onBack: () => void;
}

const RankingListSection = ({ ageGroup, onBack }: Props) => {
  const { RankingPlanListResponse, isLoading } = useRankAgeGroupQuery(ageGroup);
  const navigate = useNavigate();

  // 로딩 중일 때는 스켈레톤 컴포넌트 전체 렌더링
  if (isLoading) {
    return <RankingListSkeleton />;
  }

  // 요금제 클릭 시 상세 페이지로 이동
  const handlePlanClick = (planId: number) => {
    navigate(PATH.RANKING.DETAIL_PATH(ageGroup, planId));
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
            <RankingListInfo plan={plan} onClick={handlePlanClick} />
          </div>
        </div>
      );
    }

    if (plan.rank === 20) {
      return (
        <div className="flex gap-20 h-full pt-8 pb-24">
          <div className="flex-[2]">
            <RegulerPlanCard plan={plan} />
          </div>
          <div className="flex-[3] h-full">
            <RankingListInfo plan={plan} onClick={handlePlanClick} />
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
          <RankingListInfo plan={plan} onClick={handlePlanClick} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* 페이지 헤더 */}
      <div className="flex flex-col w-full px-30 mb-12">
        <BackButton onClick={onBack} />
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
          {RankingPlanListResponse?.plans.map((plan) => (
            <div key={plan.id}>{renderPlanItem(plan)}</div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RankingListSection;
