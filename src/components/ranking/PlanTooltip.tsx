import { Button } from '@/components/ui/button';
import { getBenefitValue } from '@/utils/ranking/formatPlanData';
import { getBenefitDescription } from '@/utils/ranking/getBenefitDescription';

interface PlanTooltipProps {
  showTooltip: string | null;
  tooltipPosition: { top: number; left: number } | null;
  allBenefits: any;
  onClose: () => void;
}

const PlanTooltip = ({ showTooltip, tooltipPosition, allBenefits, onClose }: PlanTooltipProps) => {
  if (!showTooltip || !tooltipPosition) return null;

  const descriptions = getBenefitDescription(
    showTooltip,
    getBenefitValue(allBenefits, showTooltip),
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />

      {/* 말풍선 */}
      <div
        className="absolute z-10"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="bg-bgSecondary shadow-shadowP max-w-xs relative rounded-16 p-12 flex flex-col">
          <h3 className="font-bold text-body-lg mb-4">{showTooltip} ?</h3>
          {/* 설명 */}
          <div className="text-body-sm leading-relaxed space-y-2 mb-8">
            {descriptions.map((line, index) => {
              // 🆕 클래스명 조합 로직
              let className = '';
              if (line.isBold) className += 'font-bold ';
              if (line.isSecondary) className += 'text-textSecondary ';

              return (
                <p key={index} className={className.trim()}>
                  {line.text}
                </p>
              );
            })}
          </div>
          <Button variant="default" size="sm" onClick={onClose}>
            확인
          </Button>

          {/* 말풍선 꼬리 */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-bgSecondary"></div>
        </div>
      </div>
    </div>
  );
};

export default PlanTooltip;
