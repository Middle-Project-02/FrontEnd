import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import { Button } from '@/components/ui/button';

interface PlanCardProps {
  plan: SmartChoicePlanDto;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const infoItems = [
    { label: '데이터', value: plan.data },
    { label: '통화', value: plan.voice },
    { label: '문자', value: plan.sms },
    { label: '통신망', value: plan.telecom },
  ];

  return (
    <div className="flex flex-col items-start gap-16 p-20 pt-20 pr-30 pb-20 pl-30 rounded-16 bg-white w-full">
      <h2 className="text-heading-h4 font-bold text-primary">{plan.planName}</h2>

      <main className="flex flex-col gap-16 text-body-sm text-black w-full">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start gap-6">
            <p className="text-body-md text-textSecondary">{item.label}</p>
            <p className="text-body-md font-semibold text-black">{item.value}</p>
          </div>
        ))}
      </main>

      <footer className="self-end text-body-lg font-semibold text-primary">
        월 {plan.price.toLocaleString()}원
      </footer>

      <Button variant="outline" outlineColor="primary" className="w-full">
        요금제 공유하기
      </Button>
    </div>
  );
};
export default PlanCard;
