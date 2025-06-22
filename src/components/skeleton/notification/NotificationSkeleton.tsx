import { Skeleton } from '@/components/ui/skeleton';

const NotificationCardSkeleton = () => (
  <div className="w-full max-w-[500px] bg-white rounded-16 border shadow4 py-20 px-16 mb-5">
    {/* title */}
    <Skeleton className="h-[30px] w-4/5 mb-3 bg-bgSecondary" />

    {/* tags */}
    <div className="flex gap-2 mb-5 h-[30px]">
      <Skeleton className="w-[80px] rounded-full bg-bgSecondary" />
      <Skeleton className="w-[70px] rounded-full bg-bgSecondary" />
    </div>

    {/* summary */}
    <Skeleton className="h-[24px] w-full mb-2 bg-bgSecondary" />
    <Skeleton className="h-[24px] w-5/6 mb-4 bg-bgSecondary" />

    {/* button */}
    <div className="flex justify-end">
      <Skeleton className="h-[36px] w-[96px] rounded-md bg-bgSecondary" />
    </div>
  </div>
);

export default NotificationCardSkeleton;
