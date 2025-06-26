import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/common/BackButton';
import AgeSelectButton from '@/components/ranking/AgeSelectButton';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { AGE_GROUPS } from '@/constants/ranking/ageGroups';

interface AgeSelectSectionProps {
  selectedAge: number | null;
  onSelectAge: (value: number) => void; // 실제로는 부모의 setSelectedAge 함수.
  onNext: () => void;
}

const AgeSelectSection = ({ selectedAge, onSelectAge, onNext }: AgeSelectSectionProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(PATH.HOME);
  };
  return (
    <div className="flex flex-col px-30 h-full">
      <div className="flex flex-col w-full mb-12">
        <BackButton onClick={handleBack} />
        <div className="flex flex-col">
          <h1 className="text-heading-h3 font-bold">연령대별 인기 요금제</h1>
          <h2 className="text-heading-h4 text-textSecondary">연령대를 선택해주세요!</h2>
        </div>
      </div>

      <div className="grid grid-rows-3 grid-cols-2 gap-12 flex-1">
        {AGE_GROUPS.map(({ label, value }) => (
          <AgeSelectButton
            key={value}
            label={label}
            isSelected={selectedAge === value}
            onClick={() => onSelectAge(value)}
          />
        ))}
      </div>

      <div className="flex-shrink-0 mt-12">
        <Button
          variant={selectedAge ? 'default' : 'secondary'}
          size="lg"
          className="w-full"
          disabled={!selectedAge}
          onClick={onNext}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};

export default AgeSelectSection;
