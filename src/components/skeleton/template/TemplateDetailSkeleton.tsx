import { Skeleton } from '@/components/ui/skeleton';
import BackButton from '@/components/common/BackButton';

const TemplateDetailSkeleton = () => (
  <div className="flex flex-col h-full min-h-screen bg-white break-keep">
    <header className="sticky top-0 px-[30px] pt-[44px] bg-white z-10">
      <BackButton />
      {/* header template title */}
      <Skeleton className="h-[40px] w-full mb-4 bg-bgSecondary" />
      {/* description */}
      <Skeleton className="h-[20px] w-4/5 mb-2 bg-bgSecondary" />
      <Skeleton className="h-[20px] w-2/3 mb-12 bg-bgSecondary" />
    </header>

    <main className="flex flex-col flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
      <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 w-full max-w-[300px]">
        {/* title */}
        <Skeleton className="h-[30px] w-2/3 mb-4 bg-bgSecondary" />
        {/* content */}
        <Skeleton className="h-[25px] w-full mb-3 bg-bgSecondary" />
        <Skeleton className="h-[25px] w-[90%] mb-3 bg-bgSecondary" />
        <Skeleton className="h-[25px] w-[80%] mb-3 bg-bgSecondary" />
        <Skeleton className="h-[25px] w-[70%] mb-3 bg-bgTertiary" />
        <Skeleton className="h-[25px] w-[60%] mb-3 bg-bgTertiary" />
        <Skeleton className="h-[25px] w-[50%] mb-3 bg-bgTertiary" />
      </div>

      <div className="flex justify-end w-full max-w-[300px]">
        {/* delete button */}
        <Skeleton className="h-[36px] w-[140px] rounded-md bg-bgSecondary" />
      </div>
    </main>
  </div>
);

export default TemplateDetailSkeleton;
