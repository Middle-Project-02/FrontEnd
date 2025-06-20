import { RankingPlanSummary } from '@/types/ranking';

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
    <li>
      <button
        onClick={handlePlanClick}
        className="w-full bg-white shadow-shadow2 rounded-16 px-12 py-20 flex justify-between items-center hover:bg-gray-50 transition-colors border-0 outline-none"
      >
        <div className="w-full h-full text-left">
          <p className="font-semibold text-body-md">
            {plan.rank}위 : {plan.name}
          </p>
          <div className="flex text-body-sm">
            <p>{plan.dataAmount}</p>
            {plan.speedLimit && <p>+ {plan.speedLimit}</p>}
          </div>
          {plan.sharedData && <p className="text-body-sm">{plan.sharedData}</p>}
          {plan.targetTypes && <p className="text-body-sm">{plan.targetTypes}</p>}
        </div>
        <div>
          <p className="text-primary">{plan.regularPrice}</p>
        </div>
      </button>
    </li>
  );
};

export default PlanItem;
