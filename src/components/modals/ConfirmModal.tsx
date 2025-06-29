import useModalStore from '@/stores/modalStore';
import BaseModalLayout from '@/components/common/BaseModalLayout';
import { Button } from '@/components/ui/button';
import { ConfirmModalIcon } from '@/assets/svg';

interface ConfirmModalProps {
  title: string;
  description: React.ReactNode;
  primaryText: string;
  secondaryText: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

const ConfirmModal = ({
  title,
  description,
  primaryText,
  secondaryText = '돌아가기',
  onPrimary,
  onSecondary,
}: ConfirmModalProps) => {
  const { removeModal } = useModalStore();

  const handleSecondary = () => {
    onSecondary?.();
    removeModal();
  };

  return (
    <BaseModalLayout icon={ConfirmModalIcon} title={title} description={description}>
      <Button variant="secondary" onClick={handleSecondary}>
        {secondaryText}
      </Button>
      <Button variant="destructive" onClick={onPrimary}>
        {primaryText}
      </Button>
    </BaseModalLayout>
  );
};

export default ConfirmModal;
