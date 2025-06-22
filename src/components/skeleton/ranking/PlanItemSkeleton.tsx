import { Skeleton } from '@/components/ui/skeleton';

const PlanItemSkeleton = () => {
  return (
    <li>
      <div className="w-full bg-white shadow-shadow2 rounded-16 px-12 py-16 flex justify-between items-center">
        <div className="w-full h-full text-left flex flex-col gap-[8px]">
          {/* 요금제 이름 스켈레톤 (굵은 제목 느낌) */}
          <Skeleton className="h-[15px] w-4/5 bg-gray-200" />
          {/* 데이터 정보 스켈레톤 */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[10px] w-2/5 bg-gray-200" />
            <Skeleton className="h-[10px] w-2/5 bg-gray-200" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-1">
          {/* 가격 스켈레톤 */}
          <Skeleton className="w-[70px] h-8 bg-blue-100" />
        </div>
      </div>
    </li>
  );
};

export default PlanItemSkeleton;
