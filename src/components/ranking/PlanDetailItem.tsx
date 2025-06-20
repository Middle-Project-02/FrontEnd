// import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';

// interface Props {
//   planId: number;
// }

// const PlanDetailItem = ({ planId }: Props) => {
//   const { rankDetailResponse } = useRankDetailQuery(planId);

//   if (!rankDetailResponse) return <p>불러오는 중...</p>;

//   return (
//     <div>
//       <div>메롱~</div>
//     </div>
//   );
// };

// export default PlanDetailItem;
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
    <li className="bg-white shadow-shadow2 rounded-16 px-12 py-20">
      {/* 🎯 뒤로가기 버튼 */}
      <button onClick={onBack} className="text-primary font-bold mb-12 text-sm">
        ← 목록으로 돌아가기
      </button>

      {/* 🎯 상세 정보 */}
      <div className="space-y-12">
        {/* 제목 및 가격 */}
        <div className="border-b pb-12">
          <h3 className="font-bold text-lg mb-4">
            {rankDetailResponse.rank}위 : {rankDetailResponse.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{rankDetailResponse.description}</p>
          <p className="text-primary font-bold text-xl">{rankDetailResponse.regularPrice}</p>
        </div>

        {/* 데이터 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 rounded-full px-3 py-1 text-xs">데이터</span>
          </div>
          <p className="font-bold">
            {rankDetailResponse.dataAmount}
            {/* {rankDetailResponse.speedLimit && ` + ${rankDetailResponse.speedLimit}`} */}
          </p>
        </div>

        {/* 상세 혜택들 */}
        {rankDetailResponse.allBenefits && (
          <div className="space-y-8">
            {Object.entries(rankDetailResponse.allBenefits).map(([key, value]) => (
              <div key={key} className="border-b pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 rounded-full px-3 py-1 text-xs">{key}</span>
                </div>
                <p className="font-bold">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

export default PlanDetailItem;
