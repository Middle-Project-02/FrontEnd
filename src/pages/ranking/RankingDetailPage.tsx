// pages/ranking/RankingDetailPage.tsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PlanDetailSection from '@/components/ranking/PlanDetailSection';
import BackButton from '@/components/common/BackButton';
import { PATH } from '@/constants/path';

const RankingDetailPage = () => {
  const { id, ageGroup } = useParams<{ id: string; ageGroup: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const planId = id ? parseInt(id, 10) : null;
  const ageGroupNum = ageGroup ? parseInt(ageGroup, 10) : null;

  const handleBack = () => {
    if (ageGroupNum) {
      // 명시적으로 리스트 페이지로 이동
      navigate(PATH.RANKING.LIST_PATH(ageGroupNum));
    } else {
      // ageGroup을 찾을 수 없으면 state에서 확인
      const state = location.state as { ageGroup?: number } | null;
      if (state?.ageGroup) {
        navigate(PATH.RANKING.LIST_PATH(state.ageGroup));
      } else {
        // fallback: 연령대 선택 페이지로
        navigate(PATH.RANKING.AGE_SELECT);
      }
    }
  };

  if (!planId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full pt-44 px-30">
      <BackButton onClick={handleBack} />
      <div className="h-full overflow-y-auto no-scrollbar pt-16">
        <PlanDetailSection planId={planId} />
      </div>
    </div>
  );
};

export default RankingDetailPage;
