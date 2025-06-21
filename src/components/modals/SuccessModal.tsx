import useModalStore from '@/stores/modalStore';
import BaseModalLayout from '@/components/common/BaseModalLayout';
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
    <BaseModalLayout icon={SuccessModalIcon} title={title}>
      <Button variant="default" onClick={handleSuccess}>
        {successText}
      </Button>
    </BaseModalLayout>
  );
};

export default SuccessModal;
