import type { RankingPlanSummary } from '@/types/ranking';

const RegulerPlanCard = (plan: { plan: RankingPlanSummary }) => {
  return (
    <div className="bg-[#676767] rounded-16 shadow-shadow8 text-white aspect-[4/3] w-full h-full -rotate-0">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-body-md font-semibold">{plan.plan.dataAmount}</p>
        {plan.plan.speedLimit && <p className="text-body-sm">+ {plan.plan.speedLimit}</p>}
      </div>
    </div>
  );
};

export default RegulerPlanCard;
