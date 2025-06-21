import PlanBenefitItem from '@/components/ranking/PlanBenefitItem';
import PlanTooltip from '@/components/ranking/PlanTooltip';
import { Button } from '@/components/ui/button';
import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';
import { usePlanTooltip } from '@/hooks/ranking/usePlanTooltip';
import { calculateDataComment } from '@/utils/planHelpers';
interface PlanDetailItemProps {
  planId: number;
  onBack: () => void;
}

const PlanDetailItem = ({ planId, onBack }: PlanDetailItemProps) => {
  const { rankDetailResponse } = useRankDetailQuery(planId);
  const { showTooltip, tooltipPosition, buttonRefs, openTooltip, closeTooltip } = usePlanTooltip();

  if (!rankDetailResponse) {
    return (
      <li className="bg-white shadow-shadow2 rounded-16 px-12 py-20">
        <p>불러오는 중...</p>
      </li>
    );
  }

  const dataComment = calculateDataComment(rankDetailResponse);

  return (
    <>
      <div className="flex flex-col bg-white border-primary border-2 rounded-16 px-12 py-16 gap-8">
        {/* 제목 및 가격 */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-body-md">
            {rankDetailResponse.rank}위 : {rankDetailResponse.name}
          </p>
          <p className="text-primary text-body-sm">{rankDetailResponse.regularPrice}</p>
        </div>

        {/* 설명 */}
        <p className="text-body-sm font-semibold">{rankDetailResponse.description}</p>

        {/* 혜택 목록 */}
        <div className="space-y-8">
          {rankDetailResponse.allBenefits &&
            Object.entries(rankDetailResponse.allBenefits)
              .filter(([, value]) => value !== null && value !== undefined && value !== '')
              .map(([key, value]) => (
                <PlanBenefitItem
                  key={key}
                  benefitKey={key}
                  benefitValue={value}
                  dataComment={key === '데이터' ? dataComment : undefined}
                  buttonRefs={buttonRefs}
                  onTooltipOpen={openTooltip}
                />
              ))}
        </div>

        {/* 뒤로가기 버튼 */}
        <Button variant="secondary" size="sm" onClick={onBack}>
          닫기
        </Button>
      </div>

      {/* 툴팁 */}
      <PlanTooltip
        showTooltip={showTooltip}
        tooltipPosition={tooltipPosition}
        allBenefits={rankDetailResponse.allBenefits}
        onClose={closeTooltip}
      />
    </>
  );
};

export default PlanDetailItem;
