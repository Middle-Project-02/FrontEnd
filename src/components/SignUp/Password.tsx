import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import BackButton from '@/components/common/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const Password = () => {
  const { password, setPassword, passwordConfirm, setPasswordConfirm, setStep } =
    useSignUpContext();
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const checkPassword = () => {
    if (password.trim().length < 8) {
      setErrorText('비밀번호는 8자리 이상이어야 합니다.');
      return false;
    }

    if (password !== passwordConfirm) {
      setErrorText('비밀번호가 일치하지 않습니다.');
      return false;
    }

    setErrorText('');
    return true;
  };

  const handleNextClick = () => {
    if (checkPassword()) {
      setStep('complete');
    }
  };

  return (
    <div className="flex flex-col w-full pt-44 gap-32">
      <div className="flex flex-col gap-12">
        <BackButton onClick={() => setStep('phoneNumber')} />
        <h2 className="text-heading-h2 font-semibold">
          <span>기억할 수 있는</span>
          <br />
          <span className="text-primary">비밀번호</span>를 정해주세요
        </h2>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-6 relative">
          <Label size="sm">비밀번호</Label>
          <Input
            variant="underline"
            inputSize="lg"
            placeholder="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-12 bottom-12"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff size={20} className="text-black" />
            ) : (
              <Eye size={20} className="text-textSecondary hover:text-black" />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-6 relative">
          <Label size="sm">비밀번호 재확인</Label>
          <Input
            variant="underline"
            inputSize="lg"
            placeholder="비밀번호 재확인"
            type={showPasswordConfirm ? 'text' : 'password'}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-12 bottom-32"
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
          >
            {showPasswordConfirm ? (
              <EyeOff size={20} className="text-black" />
            ) : (
              <Eye size={20} className="text-textSecondary hover:text-black" />
            )}
          </button>
          <p className="h-[16px] text-body-sm text-error">{errorText}</p>
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        disabled={!(password.trim() !== '' && passwordConfirm.trim() !== '')}
        onClick={handleNextClick}
      >
        다음으로
      </Button>
    </div>
  );
};

export default Password;
