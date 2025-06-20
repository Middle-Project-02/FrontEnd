import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  return (
    <Button
      className="flex items-center py-8 pr-8 gap-8 w-fit"
      variant="ghost"
      size="md"
      onClick={handleClick}
    >
      <ChevronLeft />
      <span className="font-medium">뒤로가기</span>
    </Button>
  );
};

export default BackButton;
