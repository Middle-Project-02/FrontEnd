// pages/RankingDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import PlanDetailItem from '@/components/ranking/PlanDetailItem';

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
    <div className="flex flex-col w-full h-full pt-44">
      <div className="px-30 h-full overflow-y-auto">
        <PlanDetailItem planId={planId} onBack={handleBack} />
      </div>
    </div>
  );
};

export default RankingDetailPage;
