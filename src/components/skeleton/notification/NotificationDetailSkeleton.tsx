import { Skeleton } from '@/components/ui/skeleton';
import NotificationSectionSkeleton from './NotificationSectionSkeleton';
import BackButton from '@/components/common/BackButton';

const NotificationDetailSkeleton = () => (
  <div className="flex flex-col h-full min-h-screen bg-white break-keep">
    <header className="sticky top-0 px-[30px] pt-[44px] bg-white z-10">
      <BackButton />
      {/* title */}
      <Skeleton className="h-[40px] w-full my-4 bg-bgSecondary" />
      {/* tags */}
      <div className="flex gap-3 flex-wrap pb-12">
        <Skeleton className="w-[80px] h-[30px] rounded-full bg-bgSecondary" />
        <Skeleton className="w-[70px] h-[30px] rounded-full bg-bgSecondary" />
      </div>
    </header>

    <main className="flex flex-col items-center pb-[100px] flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
      {[...Array(3)].map((_, i) => (
        <NotificationSectionSkeleton key={i} />
      ))}
    </main>
  </div>
);

export default NotificationDetailSkeleton;
