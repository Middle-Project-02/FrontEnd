import { hasDescription } from '@/utils/planHelpers';

interface PlanBenefitItemProps {
  benefitKey: string;
  benefitValue: string;
  dataComment?: string;
  buttonRefs: React.MutableRefObject<{ [key: string]: HTMLButtonElement | null }>;
  onTooltipOpen: (key: string) => void;
}

const PlanBenefitItem = ({
  benefitKey,
  benefitValue,
  dataComment,
  buttonRefs,
  onTooltipOpen,
}: PlanBenefitItemProps) => {
  return (
    <div className="flex flex-col border-borderSecondary border-1 rounded-16 p-8 shadow-shadow2">
      {/* 제목과 조건부 i 아이콘 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-body-sm font-medium">{benefitKey}</span>
        {hasDescription(benefitKey, benefitValue) && (
          <button
            ref={(el) => {
              buttonRefs.current[benefitKey] = el;
            }}
            onClick={() => onTooltipOpen(benefitKey)}
            className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <span className="text-primary text-xl font-bold">ⓘ</span>
          </button>
        )}
      </div>

      {/* 혜택 내용 */}
      <p className="text-body-sm font-semibold mb-2">{benefitValue}</p>

      {/* 데이터일 때 추가 메시지 */}
      {benefitKey === '데이터' && dataComment && (
        <p className="text-body-sm text-gray-600 mt-2">💡 {dataComment}</p>
      )}
    </div>
  );
};

export default PlanBenefitItem;
