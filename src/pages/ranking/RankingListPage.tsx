// pages/ranking/RankingListPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import RankingResultSection from '@/components/ranking/RankingResultSection';
import { PATH } from '@/constants/path';

const RankingListPage = () => {
  const { ageGroup } = useParams<{ ageGroup: string }>();
  const navigate = useNavigate();

  const ageGroupNum = ageGroup ? parseInt(ageGroup, 10) : null;

  const handleBack = () => {
    navigate(PATH.RANKING.AGE_SELECT); // 연령대 선택 페이지로
  };

  if (!ageGroupNum) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full pt-44">
      <RankingResultSection ageGroup={ageGroupNum} onBack={handleBack} />
    </div>
  );
};

export default RankingListPage;
