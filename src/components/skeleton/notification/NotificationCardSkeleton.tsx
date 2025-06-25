import { Skeleton } from '@/components/ui/skeleton';

const NotificationCardSkeleton = () => (
  <div className="w-full bg-white rounded-20 border shadow-shadow2 p-24 space-y-12">
    {/* title */}
    <Skeleton className="h-30 w-6/7 mb-3 bg-bgSecondary" />

    {/* tags */}
    <div className="flex flex-wrap h-[24px] gap-6">
      <Skeleton className="w-[80px] rounded-full bg-bgSecondary" />
      <Skeleton className="w-[70px] rounded-full bg-bgSecondary" />
      <Skeleton className="w-[60px] rounded-full bg-bgSecondary" />
    </div>

    {/* summary */}
    <div className="space-y-2">
      <Skeleton className="h-[16px] w-full bg-bgSecondary" />
      <Skeleton className="h-[16px] w-5/6  bg-bgSecondary" />
      <Skeleton className="h-[16px] w-3/4 bg-bgSecondary" />
    </div>

    {/* button */}
    <div className="flex justify-end">
      <Skeleton className="h-[26px] w-[80px] bg-bgSecondary" />
    </div>
  </div>
);

export default NotificationCardSkeleton;
