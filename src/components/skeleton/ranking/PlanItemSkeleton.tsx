import { Skeleton } from '@/components/ui/skeleton';

const PlanItemSkeleton = () => {
  return (
    <li>
      <div className="w-full bg-white shadow-shadow2 rounded-16 px-12 py-16 flex justify-between items-center">
        <div className="w-full h-full text-left space-y-2">
          {/* 요금제 이름 스켈레톤 */}
          <Skeleton className="h-5 w-3/4" />
          {/* 데이터 정보 스켈레톤 */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          {/* 추가 정보 스켈레톤 */}
          <Skeleton className="h-4 w-24" />
        </div>
        <div>
          {/* 가격 스켈레톤 */}
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </li>
  );
};

export default PlanItemSkeleton;
