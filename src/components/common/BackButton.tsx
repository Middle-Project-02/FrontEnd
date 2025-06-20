import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="flex items-center py-8 pr-8 gap-8 w-fit"
      variant="ghost"
      size="md"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft />
      <span className="font-medium">뒤로가기</span>
    </Button>
  );
};

export default BackButton;
