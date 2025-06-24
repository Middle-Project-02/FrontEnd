// pages/ranking/RankingAgeSelectPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgeSelectSection from '@/components/ranking/AgeSelectSection';
import { PATH } from '@/constants/path';

const RankingAgeSelectPage = () => {
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedAge) {
      navigate(PATH.RANKING.LIST_PATH(selectedAge)); // 선택된 연령대 목록으로 이동
    }
  };

  return (
    <div className="flex flex-col w-full h-full pt-44">
      <AgeSelectSection
        selectedAge={selectedAge}
        onSelectAge={setSelectedAge}
        onNext={handleNext}
      />
    </div>
  );
};

export default RankingAgeSelectPage;
