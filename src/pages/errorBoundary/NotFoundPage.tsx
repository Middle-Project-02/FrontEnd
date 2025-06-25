import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { serverError } from '@/assets/svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-30 pt-84 gap-40">
      <div className="">
        <img src={serverError} alt="serverError Image" />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-heading-h3 font-bold">페이지를 찾을 수 없습니다.</h1>

        <p className="text-body-sm text-center">
          요청하신 페이지가 존재하지 않거나,
          <br />
          이동되었을 수 있어요.
          <br />
          다시 처음 화면으로 안내해드릴게요.
        </p>

        <Button className="w-full" onClick={() => navigate(PATH.ROOT)}>
          처음화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
