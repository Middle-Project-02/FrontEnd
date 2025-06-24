import { useParams, useNavigate } from 'react-router-dom';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';
import BackButton from '@/components/common/BackButton';

const RankingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const planId = id ? parseInt(id, 10) : null;

  const handleBack = () => {
    navigate(-1);
  };

  if (!planId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full pt-44 px-30">
      <BackButton />
      <div className="h-full overflow-y-auto no-scrollbar">
        <PlanDetailItem planId={planId} onBack={handleBack} />
      </div>
    </div>
  );
};

export default RankingDetailPage;
