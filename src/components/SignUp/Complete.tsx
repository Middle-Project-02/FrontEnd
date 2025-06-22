import { Button } from '@/components/ui/button';
import useRegisterMutation from '@/hooks/queries/auth/useRegisterMutation';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const Complete = () => {
  const { name, phoneNumber, password, setStep, reset } = useSignUpContext();
  const { mutatePostRegister } = useRegisterMutation();

  const handleRegisterClick = async () => {
    await mutatePostRegister({
      memberId: phoneNumber,
      nickname: name,
      password,
    });

    setStep('welcome');
  };

  return (
    <div className="flex flex-col w-full pt-84 gap-32">
      <div className="flex flex-col gap-12">
        <h2 className="text-heading-h2 font-semibold">
          <span>입력한 정보가 맞는지</span>
          <br />
          다시 한번 <span className="text-primary">확인</span>해볼게요
        </h2>
      </div>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col pb-8 gap-8 border-b border-borderSecondary">
          <p className="text-body-sm text-textSecondary">이름</p>
          <p className="text-body-lg text-black font-semibold">{name}</p>
        </div>
        <div className="flex flex-col pb-8 gap-8 border-b border-borderSecondary">
          <p className="text-body-sm text-textSecondary">전화번호</p>
          <p className="text-body-lg text-black font-semibold">{phoneNumber}</p>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <Button variant="default" size="lg" onClick={handleRegisterClick}>
          회원가입 하기
        </Button>
        <Button variant="outline" outlineColor="primary" size="lg" onClick={reset}>
          다시 입력할게요
        </Button>
      </div>
    </div>
  );
};

export default Complete;
