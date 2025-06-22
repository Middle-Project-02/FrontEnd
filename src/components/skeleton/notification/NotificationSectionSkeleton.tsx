import { Skeleton } from '@/components/ui/skeleton';

const NotificationSectionSkeleton = () => (
  <section className="mb-[16px] w-full max-w-[500px]">
    {/* icon + title */}
    <div className="flex items-center gap-[6px] mb-[12px]">
      <Skeleton className="h-[30px] w-[30px] rounded-full bg-bgSecondary" />
      <Skeleton className="h-[30px] w-[180px] bg-bgSecondary" />
    </div>

    {/* content */}
    <div className="bg-white rounded-16 border shadow4 py-20 px-16 text-body-lg">
      <Skeleton className="h-[24px] w-full mb-3 bg-bgSecondary" />
      <Skeleton className="h-[24px] w-[90%] mb-3 bg-bgSecondary" />
      <Skeleton className="h-[24px] w-[80%] bg-bgSecondary" />
    </div>
  </section>
);

export default NotificationSectionSkeleton;
