import { Skeleton } from '@/components/ui/skeleton';

const MyPageSkeleton = () => (
  <section className="flex flex-col h-full gap-16 items-center">
    <article className="w-[300px] h-[345px] bg-white border border-borderSecondary rounded-16 flex flex-col items-center px-16 py-20 gap-36">
      <Skeleton className="w-[100px] h-[100px] rounded-full bg-bgTertiary" />
      <Skeleton className="w-[140px] h-[24px] rounded-md bg-bgTertiary" />
      <div className="w-full flex flex-col gap-12">
        <Skeleton className="h-[20px] w-full rounded-md bg-bgTertiary" />
        <Skeleton className="h-[20px] w-full rounded-md bg-bgTertiary" />
      </div>
    </article>

    <div className="w-full max-w-[360px] flex justify-end">
      <Skeleton className="w-[80px] h-[40px] rounded-8 bg-bgSecondary" />
    </div>
  </section>
);

export default MyPageSkeleton;
