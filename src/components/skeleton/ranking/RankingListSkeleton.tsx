import BackButton from '@/components/common/BackButton';
import { Skeleton } from '@/components/ui/skeleton';
import { PATH } from '@/constants/path';
import { useNavigate } from 'react-router-dom';

const RankingListSkeleton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(PATH.HOME);
  };

  return (
    <div className="flex flex-col pt-44 px-30 gap-12">
      {/* 페이지 헤더 */}
      <BackButton onClick={handleBack} />
      <div className="flex flex-col gap-28">
        <div className="flex flex-col gap-8">
          <Skeleton className="h-[30px] w-4/6 bg-gray-200" />
          <Skeleton className="h-[20px] w-5/6 bg-gray-100" />
        </div>
        <div className="first flex gap-20">
          <div className="flex-[2] bg-primary-gradient rounded-16 px-36 py-16 shadow-shadowP2 -rotate-2 text-white aspect-[4/3] w-full"></div>
          <div className="flex-[3] flex flex-col gap-12 justify-center">
            <Skeleton className="h-[20px] w-2/5 bg-gray-200" />
            <Skeleton className="h-[20px] w-4/5 bg-gray-100" />
            <Skeleton className="h-[40px] w-full bg-blue-200" />
          </div>
        </div>
        <div className="flex flex-col gap-12">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="reguler flex gap-20 mt-16">
              <div className="flex-[2] bg-card-gradient rounded-16 shadow-shadow8 text-white aspect-[4/3] w-full h-full -rotate-0" />
              <div className="flex-[3] flex flex-col gap-12 justify-center">
                <Skeleton className="h-[20px] w-2/5 bg-gray-200" />
                <Skeleton className="h-[20px] w-3/5 bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingListSkeleton;
