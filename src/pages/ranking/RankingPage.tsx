import { useState } from 'react';
import AgeSelectSection from '@/components/ranking/AgeSelectSection';
import RankingResultSection from '@/components/ranking/RankingResultSection';

const RankingPage = () => {
  const [step, setStep] = useState<'select' | 'result' | 'detail'>('select'); //현재 어떤 단계인지
  const [selectedAge, setSelectedAge] = useState<number | null>(null); // 선택된 연령대

  return (
    <div className="flex flex-col w-full h-full pt-44">
      {step === 'select' && ( //첫 번째 단계: 연령대 선택
        <AgeSelectSection
          selectedAge={selectedAge}
          onSelectAge={setSelectedAge} //setSelectedAge 함수를 onSelectAge 라는 이름으로 전달.
          onNext={() => setStep('result')} // 다음으로 버튼을 클릭하면
        />
      )}
      {step === 'result' && selectedAge !== null && (
        <RankingResultSection ageGroup={selectedAge} onBack={() => setStep('select')} />
      )}
    </div>
  );
};

export default RankingPage;
