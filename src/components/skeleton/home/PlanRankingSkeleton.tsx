import { Skeleton } from '@/components/ui/skeleton';

const PlanRankingSkeleton = () => {
  return (
    <div className="overflow-x-auto no-scrollbar px-6 h-[170px] whitespace-nowrap">
      <div className="flex w-fit gap-20">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col shrink-0 w-[85vw] max-w-[240px] h-[165px] px-16 py-20 gap-8 border border-borderSecondary bg-bgTertiary rounded-16 shadow-shadow2 snap-center"
          >
            <Skeleton className="h-[28px] w-2/3 bg-bgSecondary rounded" />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[20px] w-[120px] bg-bgSecondary rounded" />
                <Skeleton className="h-[16px] w-[80px] bg-bgSecondary rounded" />
              </div>
              <Skeleton className="h-[20px] w-[80px] bg-bgSecondary rounded self-end" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanRankingSkeleton;
