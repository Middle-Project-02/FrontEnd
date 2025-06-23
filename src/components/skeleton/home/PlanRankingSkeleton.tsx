import { Skeleton } from '@/components/ui/skeleton';

const PlanRankingSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col px-16 py-20 gap-8 border border-borderSecondary bg-bgTertiary rounded-16 shadow-shadow2 h-[165px]">
        <Skeleton className="h-[28px] w-2/3 bg-bgSecondary rounded" />
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[20px] w-[120px] bg-bgSecondary rounded" />
            <div className="flex items-center gap-8">
              <Skeleton className="h-[16px] w-[80px] bg-bgSecondary rounded" />
              <span className="w-[1px] h-[12px] bg-borderSecondary" />
              <Skeleton className="h-[16px] w-[80px] bg-bgSecondary rounded" />
            </div>
          </div>
          <Skeleton className="h-[20px] w-[80px] bg-bgSecondary rounded self-end" />
        </div>
      </div>
    </div>
  );
};

export default PlanRankingSkeleton;
