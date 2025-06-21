import useModalStore from '@/stores/modalStore';
import BaseModalLayout from '@/components/common/BaseModalLayout';
import { Button } from '@/components/ui/button';
import { SuccessModalIcon } from '@/assets/svg';

interface SuccessModalProps {
  title: string;
  buttonText: string;
  onSuccess: () => void;
}

const SuccessModal = ({ title, buttonText, onSuccess }: SuccessModalProps) => {
  const { removeModal } = useModalStore();

  const handleSuccess = () => {
    onSuccess();
    removeModal();
  };

  return (
    <BaseModalLayout icon={SuccessModalIcon} title={title}>
      <Button variant="default" onClick={handleSuccess}>
        {buttonText}
      </Button>
    </BaseModalLayout>
  );
};

export default SuccessModal;
