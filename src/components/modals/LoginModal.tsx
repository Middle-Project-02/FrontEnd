import { Button } from '@/components/ui/button';
import { LoginModalIcon } from '@/assets/svg';

interface LoginModalProps {
  title: string;
  description: string;
  loginText: string;
  cancelText?: string;
  onLogin: () => void;
  onCancel?: () => void;
}

const LoginModal = ({
  title,
  description,
  loginText,
  cancelText = '돌아가기',
  onLogin,
  onCancel,
}: LoginModalProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-[16px] break-keep">
      <img src={LoginModalIcon} alt="login" />
      <div className="flex flex-col gap-3">
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
        <p className="text-body-md">{description}</p>
      </div>
      <div className="flex flex-row gap-5">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button onClick={onLogin}>{loginText}</Button>
      </div>
    </div>
  );
};

export default LoginModal;
