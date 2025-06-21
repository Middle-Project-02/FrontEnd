import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { serverError } from '@/assets/svg';

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-30 pt-84 gap-40">
      <div className="">
        <img src={serverError} alt="serverError Image" />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-heading-h3 font-bold">서버에 문제가 발생했어요.</h1>

        <p className="text-body-sm text-center">
          서버가 일시적으로 응답하지 않거나,
          <br />
          오류가 발생했습니다.
          <br />
          잠시 후에 다시 시도해 주세요!
        </p>

        <Button className="w-full" onClick={() => navigate(PATH.ROOT)}>
          처음화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default ServerErrorPage;
