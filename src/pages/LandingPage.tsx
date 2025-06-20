import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { Button } from '@/components/ui/button';
import { LandingDog } from '@/assets/svg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[360px] items-center px-30 pt-84 gap-40">
      <div className="w-[300px] h-[300px]">
        <img src={LandingDog} alt="LandingDog" />
      </div>
      <div className="flex flex-col w-full gap-16">
        <h3 className="text-heading-h3 text-black font-semibold text-center">
          우리 모두 함께, TOGETHER
        </h3>
        <p className="text-body-sm text-black text-center font-medium">
          실수해도 괜찮아요,
          <br />
          친절한 우리 아지가 처음부터 끝까지 함께할게요.
        </p>
        <div className="flex flex-col gap-12">
          <Button variant="default" size="lg" onClick={() => navigate(PATH.LOGIN)}>
            로그인하고 계속하기
          </Button>
          <Button
            variant="outline"
            outlineColor="primary"
            size="lg"
            onClick={() => navigate(PATH.HOME)}
          >
            계정 없이 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
