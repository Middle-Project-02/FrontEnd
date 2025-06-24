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
      <div onClick={handlePlanClick} className="w-full h-full bg-white flex flex-col">
        {plan.rank === 1 ? (
          <div className="flex flex-col h-full justify-evenly">
            <p className="font-semibold text-heading-h4">{plan.rank}위</p>
            <p className="text-body-lg">{plan.regularPrice}</p>
            <Button size="md" onClick={handlePlanClick}>
              요금제 보기
            </Button>
          </div>
          {plan.sharedData && <p className="text-body-sm">{plan.sharedData}</p>}
          {plan.targetTypes && <p className="text-body-sm">{plan.targetTypes}</p>}
        </div>
        <div>
          <p className="text-primary text-body-xs">{plan.regularPrice}</p>
        </div>
      </button>
    </li>
  );
};

export default PlanItem;
