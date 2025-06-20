import { Button } from '@/components/ui/button';
import { ConfirmModalIcon } from '@/assets/svg';
import useModalStore from '@/stores/modalStore';

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmModal = ({
  title,
  description,
  confirmText,
  cancelText = '돌아가기',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const { removeModal } = useModalStore();

  const handleCancel = () => {
    onCancel?.();
    removeModal();
  };

  return (
    <div className="flex flex-col justify-center items-center text-center gap-[16px] break-keep">
      <img src={ConfirmModalIcon} alt="confirm" />
      <div className="flex flex-col gap-3">
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
        <p className="text-body-md">{description}</p>
      </div>
      <div className="flex flex-row gap-5">
        <Button variant="secondary" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
