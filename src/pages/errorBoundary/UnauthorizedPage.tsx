import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { serverError } from '@/assets/svg';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-30 pt-84 gap-40">
      <div className="">
        <img src={serverError} alt="Dog image" />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-heading-h3 font-bold">로그인이 필요한 페이지입니다.</h1>

        <p className="text-body-sm text-center">
          로그인하지 않은 상태에서는
          <br />
          이 페이지를 볼 수 없습니다.
          <br />
          로그인 후 다시 시도해 주세요!
        </p>

        <Button className="w-full" onClick={() => navigate(PATH.LOGIN)}>
          로그인하러 가기
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
