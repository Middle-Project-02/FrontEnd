import { useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const Password = () => {
  const { password, setPassword, passwordConfirm, setPasswordConfirm, setStep } =
    useSignUpContext();
  const [errorText, setErrorText] = useState('');

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
        <div className="flex flex-col gap-6">
          <Label size="sm">비밀번호</Label>
          <Input
            variant="underline"
            inputSize="lg"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Label size="sm">비밀번호 재확인</Label>
          <Input
            variant="underline"
            inputSize="lg"
            placeholder="비밀번호 재확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
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
