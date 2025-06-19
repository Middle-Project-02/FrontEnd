import useRankingPlanListQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';
import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';
import { useEffect, useState } from 'react';

const RankingPage = () => {
  const [ageGroup, setAgeGroup] = useState<number>(2); // 기본: 20대

  const { RankingPlanListResponse } = useRankingPlanListQuery(ageGroup);
  const [rankId, setRankId] = useState<number>(1);
  const { rankDetailResponse } = useRankDetailQuery(rankId);

  useEffect(() => {
    if (rankDetailResponse) {
      console.log('📦 최신 상세 데이터:', rankDetailResponse);
    }
  }, [rankDetailResponse]);

  const handleClickPlan = (planId: number) => {
    setRankId(planId);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">요금제 랭킹</h1>

      <select
        value={ageGroup}
        onChange={(e) => setAgeGroup(Number(e.target.value))}
        className="mb-4 border px-2 py-1"
      >
        <option value={1}>전체</option>
        <option value={2}>20대</option>
        <option value={3}>30대</option>
        <option value={4}>40대</option>
        <option value={5}>50대</option>
        <option value={6}>60대 이상</option>
      </select>

      <div className="space-y-4">
        {RankingPlanListResponse?.plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => {
              handleClickPlan(plan.id);
            }}
            className="border p-4 rounded shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              {plan.rank}. {plan.name}
            </h2>
            <p>가격: {plan.regularPrice}</p>
            <p>데이터: {plan.dataAmount}</p>
            <p>공유 데이터: {plan.sharedData || '없음'}</p>
            <p>속도 제한: {plan.speedLimit || '없음'}</p>
            <p>대상 유형: {plan.targetTypes || '모두'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
