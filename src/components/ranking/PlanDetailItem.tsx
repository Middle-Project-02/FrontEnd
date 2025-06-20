import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';

interface PlanDetailItemProps {
  planId: number;
  onBack: () => void;
}

const PlanDetailItem = ({ planId, onBack }: PlanDetailItemProps) => {
  const { rankDetailResponse } = useRankDetailQuery(planId);

  if (!rankDetailResponse) {
    return (
      <li className="bg-white shadow-shadow2 rounded-16 px-12 py-20">
        <p>불러오는 중...</p>
      </li>
    );
  }

  return (
    <div className="flex flex-col bg-white border-primary border-2 rounded-16 px-12 py-16 gap-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-body-md">
          {rankDetailResponse.rank}위 : {rankDetailResponse.name}
        </p>
        <p className="text-primary text-body-sm">{rankDetailResponse.regularPrice}</p>
      </div>
      <p className="text-body-sm text-semibold">{rankDetailResponse.description}</p>
      <div className="space-y-8">
        {rankDetailResponse.allBenefits &&
          Object.entries(rankDetailResponse.allBenefits)
            .filter(([key, value]) => value !== null && value !== undefined && value !== '') // null, undefined, 빈 문자열 제외
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col border-borderSecondary border-1 rounded-16 p-8 shadow-shadow2"
              >
                <div className="flex items-center">
                  <span className="text-body-sm">{key}</span>
                </div>
                <p className="text-body-sm font-semibold">{value}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PlanDetailItem;
