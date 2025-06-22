import { useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const Name = () => {
  const { name, setName, setStep } = useSignUpContext();
  const [errorText, setErrorText] = useState('');

  const checkName = () => {
    if (name.trim().length < 2) {
      setErrorText('이름은 두 글자 이상이어야 합니다.');
      return false;
    }

    setErrorText('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNextClick = () => {
    if (checkName()) {
      setStep('phoneNumber');
    }
  };

  return (
    <div className="flex flex-col w-full pt-44 gap-32">
      <div className="flex flex-col gap-12">
        <BackButton />
        <h2 className="text-heading-h2 font-semibold">
          <span className="text-primary">이름</span>을
          <br />
          알려주세요
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <Label size="sm">이름</Label>
        <Input
          variant="underline"
          inputSize="lg"
          placeholder="이름"
          value={name}
          onChange={handleChange}
        />
        <p className="h-[16px] text-body-sm text-error">{errorText}</p>
      </div>
      <Button variant="default" size="lg" disabled={!name.trim()} onClick={handleNextClick}>
        다음으로
      </Button>
    </div>
  );
};

export default Name;
