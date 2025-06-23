import { Skeleton } from '@/components/ui/skeleton';

const TemplateCardSkeleton = () => (
  <div className="w-full max-w-[300px] bg-white rounded-16 border shadow4 py-20 px-16 mb-5">
    {/* title */}
    <Skeleton className="h-[30px] w-4/5 mb-4 bg-bgSecondary" />

    {/* content (2줄 요약) */}
    <Skeleton className="h-[20px] w-full mb-2 bg-bgSecondary" />
    <Skeleton className="h-[20px] w-5/6 mb-4 bg-bgSecondary" />

    {/* button */}
    <div className="flex justify-end">
      <Skeleton className="h-[36px] w-[96px] rounded-md bg-bgSecondary" />
    </div>
  </div>
);

export default TemplateCardSkeleton;
