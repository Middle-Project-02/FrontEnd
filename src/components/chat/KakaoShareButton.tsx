import { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import { useKakaoShare } from '@/hooks/useKakaoShare';
import { Button } from '@/components/ui/button';

const KakaoShareButton = ({ planInfo }: { planInfo: SmartChoicePlanDto }) => {
  const { share } = useKakaoShare(planInfo);

  return (
    <>
      <Button onClick={share} variant="outline" outlineColor="primary" className="w-full">
        요금제 공유하기
      </Button>
    </>
  );
};

export default KakaoShareButton;
