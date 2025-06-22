import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const PlanDetailItemSkeleton = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col bg-white border-primary border-2 rounded-16 px-12 py-16 gap-8">
      {/* 제목 및 가격 스켈레톤 */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* 설명 스켈레톤 */}
      <Skeleton className="h-4 w-3/4" />

      {/* 혜택 목록 스켈레톤 */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex flex-col border-borderSecondary border-1 rounded-16 p-8 shadow-shadow2"
          >
            {/* 제목 */}
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-16" />
            </div>
            {/* 혜택 내용 */}
            <Skeleton className="h-4 w-full mb-2" />
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
