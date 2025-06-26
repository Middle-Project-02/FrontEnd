import type { RankingPlanSummary } from '@/types/ranking';

const FirstPlanCard = (plan: { plan: RankingPlanSummary }) => {
  return (
    <div className="bg-primary-gradient rounded-16 px-36 py-16 shadow-shadowP2 -rotate-2 text-white aspect-[4/3] w-full">
      <div className="flex flex-col justify-center w-full h-full">
        <p className="text-heading-h4 font-bold mb-2">데이터</p>
        <p className="text-heading-h4 text-textPrimary">{plan.plan.dataAmount}</p>
        {plan.plan.speedLimit && <p className="text-body-sm">+ {plan.plan.speedLimit}</p>}
      </div>
    </div>
  );
};

export default FirstPlanCard;
