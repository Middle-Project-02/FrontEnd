import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const PlanDetailItemSkeleton = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col bg-white border-primary border-2 rounded-16 px-12 py-16 gap-[12px]">
      {/* 제목 및 가격 스켈레톤 */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-[10px] w-2/4 bg-gray-200" />
        <Skeleton className="h-[5px] w-1/5 bg-blue-100" />
      </div>

      {/* 설명 스켈레톤 */}
      <div className="space-y-2">
        <Skeleton className="h-[6px] w-3/4 bg-gray-200" />
      </div>

      {/* 혜택 목록 스켈레톤 */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex flex-col border-borderSecondary border-1 rounded-16 px-[10px] py-10 shadow-shadow2 gap-12"
          >
            <Skeleton className="h-[6px] w-2/5 bg-gray-200" />
            <Skeleton className="h-4 w-2/4 bg-gray-200" />
          </div>
        ))}
      </div>

      {/* 뒤로가기 버튼은 실제 버튼으로 유지 */}
      <Button variant="secondary" size="sm" onClick={onBack}>
        닫기
      </Button>
    </div>
  );
};

export default PlanDetailItemSkeleton;
