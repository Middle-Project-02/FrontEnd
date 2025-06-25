import { Button } from '@/components/ui/button';
import type { RankingPlanSummary } from '@/types/ranking';

interface PlanItemProps {
  plan: RankingPlanSummary;
  onClick?: (planId: number) => void; // 클릭 이벤트 핸들러
}

const PlanItem = ({ plan, onClick }: PlanItemProps) => {
  const handlePlanClick = () => {
    if (onClick) {
      onClick(plan.id);
    }
  };
  return (
    <li className="h-full">
      <div onClick={handlePlanClick} className="w-full h-full flex flex-col justify-evenly">
        {plan.rank === 1 ? (
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-heading-h4">{plan.rank}위</p>
            <p className="text-body-lg">{plan.regularPrice}</p>
            <Button size="md" onClick={handlePlanClick}>
              요금제 보기
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-body-lg">{plan.rank}위</p>
            <p className="text-body-md">{plan.regularPrice}</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default PlanItem;
