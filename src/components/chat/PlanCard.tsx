import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';

const PlanCard = ({ plan }: { plan: SmartChoicePlanDto }) => {
  const infoItems = [
    { label: '데이터', value: plan.data },
    { label: '통화', value: plan.voice },
    { label: '문자', value: plan.sms },
    { label: '통신망', value: plan.telecom },
  ];

  return (
    <div className="flex flex-col items-start gap-[var(--collection-1-spacing-20)] pt-[var(--collection-1-spacing-30)] pr-[var(--collection-1-spacing-20)] pb-[var(--collection-1-spacing-30)] pl-[var(--collection-1-spacing-20)] relative bg-collection-1-color-bg-white rounded-[var(--collection-1-border-radius-16)] shadow-shadow-shadow2 max-w-[268px]">
      <div className="items-end justify-center gap-[var(--collection-1-spacing-16)] flex flex-col relative self-stretch w-full">
        <p className="relative self-stretch mt-[-1.00px] font-heading-h4 text-collection-1-color-text-black tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] text-[length:var(--heading-h4-font-size)]">
          <span className="text-primary">{plan.planName}</span>
        </p>

        <div className="items-start gap-[var(--collection-1-spacing-16)] flex flex-col relative self-stretch w-full">
          {infoItems.map((item, idx) => (
            <div
              key={idx}
              className="items-start justify-center gap-[var(--collection-1-spacing-6)] flex flex-col relative self-stretch w-full"
            >
              <div className="relative w-fit font-body-md-regular text-collection-1-color-text-textSecondary">
                {item.label}
              </div>
              <div className="text-collection-1-color-text-black font-body-md-semibold">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="text-collection-1-color-text-primary font-body-lg-semibold text-[length:var(--body-lg-semibold-font-size)]">
          월 {plan.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
