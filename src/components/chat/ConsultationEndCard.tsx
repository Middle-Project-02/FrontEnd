import { Button } from '@/components/ui/button';

interface ConsultationEndCardProps {
  onEndConsultation: () => void;
}

const ConsultationEndCard = ({ onEndConsultation }: ConsultationEndCardProps) => {
  return (
    <div className="flex flex-col items-center gap-16 p-20 pt-20 pr-30 pb-20 pl-30 rounded-16 bg-white w-full">
      <div className="mb-4 text-center">
        <h4 className="text-heading-h4 font-bold text-primary">
          종료하기를 누르면 <br />홈 화면으로 이동합니다.
        </h4>
        <p className="text-body-md text-black whitespace-pre-line mt-2">
          요금제 변경 안내서는 안내서 보기에서 다시 볼 수 있어요.
        </p>
      </div>
      <Button onClick={onEndConsultation} variant="default" size="lg" className="w-full">
        종료하기
      </Button>
    </div>
  );
};

export default ConsultationEndCard;
