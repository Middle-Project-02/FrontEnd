import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex w-full border-t border-borderSecondary py-8 px-30">
      <Button
        className="flex flex-col flex-1"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.HOME)}
      >
        <Home className={location.pathname === PATH.HOME ? 'stroke-primary' : 'stroke-black'} />
        <span
          className={`text-body-sm font-medium ${location.pathname === PATH.HOME ? 'text-primary' : 'text-black'}`}
        >
          홈
        </span>
      </Button>

      <Button
        className="flex flex-col flex-1"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.CHAT)}
      >
        <MessageCircle
          className={location.pathname === PATH.CHAT ? 'stroke-primary' : 'stroke-black'}
        />
        <span
          className={`text-body-sm font-medium ${location.pathname === PATH.CHAT ? 'text-primary' : 'text-black'}`}
        >
          챗봇
        </span>
      </Button>

      <Button
        className="flex flex-col flex-1"
        variant="ghost"
        size="lg"
        onClick={() => navigate(PATH.MYPAGE)}
      >
        <User className={location.pathname === PATH.MYPAGE ? 'stroke-primary' : 'stroke-black'} />
        <span
          className={`text-body-sm font-medium ${location.pathname === PATH.MYPAGE ? 'text-primary' : 'text-black'}`}
        >
          내 정보
        </span>
      </Button>
    </div>
  );
};

export default NavigationBar;
