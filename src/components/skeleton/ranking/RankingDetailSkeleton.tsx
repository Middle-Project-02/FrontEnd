import { Skeleton } from '@/components/ui/skeleton';

const RankingDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-30">
      <div className="bg-primary-gradient rounded-16 shadow-shadowP2 text-white px-24 py-16 flex flex-col gap-8 mx-2">
        <div className="flex flex-col gap-20">
          <Skeleton className="h-[20px] w-2/6 bg-gray-300" />
          <Skeleton className="h-[20px] w-5/6 bg-gray-200" />
          <Skeleton className="h-[20px] w-3/6 bg-gray-200 self-end" />
        </div>
      </div>
      <div className="plan-price flex flex-col">
        <div className="flex flex-col bg-bgSecondary rounded-16 px-20 py-16 gap-12 shadow-shadow4">
          <div className="flex-1">
            <Skeleton className="h-[20px] w-2/6 bg-gray-200 mb-8" />
            <Skeleton className="h-[20px] w-2/6 bg-gray-300" />
          </div>
          <hr className="border-bgSecondaryHover rounded-16 border-1" />
          <div className="flex-1">
            <Skeleton className="h-[20px] w-2/6 bg-gray-200 mb-8" />
            <Skeleton className="h-[20px] w-4/6 bg-gray-300" />
          </div>
        </div>
      </div>
      <Skeleton className="h-[40px] w-full bg-gray-100" />
      <div className="plan-details flex flex-col pb-24">
        <h1 className="text-body-lg font-semibold mb-12">요금제 안내</h1>
        <hr className="border-bgSecondaryHover rounded-16 border-1" />
        <div className="flex flex-col divide-y divide-borderLight py-16 gap-12">
          <Skeleton className="h-[25px] w-2/6 bg-gray-100" />
          <Skeleton className="h-[25px] w-2/6 bg-blue-100" />
          <Skeleton className="h-[50px] w-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default RankingDetailSkeleton;
