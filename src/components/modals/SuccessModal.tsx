import useModalStore from '@/stores/modalStore';
import { Button } from '@/components/ui/button';
import { SuccessModalIcon } from '@/assets/svg';

interface SuccessModalProps {
  title: string;
  successText: string;
  onSuccess: () => void;
}

const SuccessModal = ({ title, successText, onSuccess }: SuccessModalProps) => {
  const { removeModal } = useModalStore();

  const handleSuccess = () => {
    onSuccess();
    removeModal();
  };

  return (
    <div className="flex flex-col justify-center items-center text-center gap-[16px] break-keep">
      <img src={SuccessModalIcon} alt="success" />
      <div className="flex flex-col gap-3">
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
      </div>
      <div className="flex flex-row gap-5">
        <Button variant="default" onClick={handleSuccess}>
          {successText}
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
