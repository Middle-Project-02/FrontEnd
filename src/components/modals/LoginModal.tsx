import useModalStore from '@/stores/modalStore';
import BaseModalLayout from '@/components/common/BaseModalLayout';
import { Button } from '@/components/ui/button';
import { LoginModalIcon } from '@/assets/svg';

interface LoginModalProps {
  title: string;
  description: string;
  primaryText: string;
  secondaryText: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

const LoginModal = ({
  title,
  description,
  primaryText,
  secondaryText = '돌아가기',
  onPrimary,
  onSecondary,
}: LoginModalProps) => {
  const { removeModal } = useModalStore();

  const handleSecondary = () => {
    onSecondary?.();
    removeModal();
  };

  return (
    <BaseModalLayout icon={LoginModalIcon} title={title} description={description}>
      <Button variant="secondary" onClick={handleSecondary}>
        {secondaryText}
      </Button>
      <Button onClick={onPrimary}>{primaryText}</Button>
    </BaseModalLayout>
  );
};

export default LoginModal;
