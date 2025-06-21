import { useNavigate } from 'react-router-dom';
import { WelcomeDog } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const Welcome = () => {
  const { name } = useSignUpContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pt-84 gap-30">
      <div className="flex flex-col text-center gap-8">
        <h3 className="text-heading-h3 font-semibold">가입이 완료되었어요!</h3>
        <h1 className="text-heading-h1 font-semibold leading-tight">
          <span className="text-primary">{name}</span> 님,
          <br />
          환영합니다!
        </h1>
      </div>
      <div className="w-[300px] h-[300px]">
        <img src={WelcomeDog} />
      </div>
      <Button variant="default" size="lg" onClick={() => navigate(PATH.LOGIN)}>
        로그인하러 가기
      </Button>
    </div>
  );
};

export default Welcome;
