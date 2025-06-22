import { useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const PhoneNumber = () => {
  const { phoneNumber, setPhoneNumber, setStep } = useSignUpContext();
  const [errorText, setErrorText] = useState('');

  const checkPhoneNumber = () => {
    const number = phoneNumber.replace(/-/g, '').trim();
    const isValid = /^(010|011)\d{8}$/.test(number);

    if (!isValid) {
      setErrorText('010 또는 011로 시작하는 11자리 숫자만 입력해주세요.');
      return false;
    }

    setErrorText('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleNextClick = () => {
    if (checkPhoneNumber()) {
      setStep('password');
    }
  };

  return (
    <div className="flex flex-col w-full pt-44 gap-32">
      <div className="flex flex-col gap-12">
        <BackButton onClick={() => setStep('name')} />
        <h2 className="text-heading-h2 font-semibold">
          <span className="text-primary">전화번호</span>를
          <br />
          알려주세요
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <Label size="sm">전화번호</Label>
        <Input
          variant="underline"
          inputSize="lg"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={handleChange}
        />
        <p className="h-[16px] text-body-sm text-error">{errorText}</p>
      </div>
      <Button variant="default" size="lg" disabled={!phoneNumber.trim()} onClick={handleNextClick}>
        다음으로
      </Button>
    </div>
  );
};

export default PhoneNumber;
