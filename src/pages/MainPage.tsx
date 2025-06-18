import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-20 bg-bgSecondary px-20">
      <h1 className="text-heading-h3 font-semibold text-black">투게더에 오신 걸 환영합니다 👋</h1>
      <Button size="lg" onClick={() => navigate('/smishing')}>
        스미싱 챗봇 페이지 가기
      </Button>
    </div>
  );
};

export default App;
