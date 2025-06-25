import { Button } from '@/components/ui/button';

interface TemplateCardProps {
  title: string;
  content: string;
  onDetailClick?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, content, onDetailClick }) => {
  return (
    <div className="bg-white rounded-16 border shadow-shadow2 py-20 px-16 mb-5 max-w-[300px]">
      <h2 className="font-semibold text-heading-h4 mb-1">{title}</h2>

      <p className="text-body-md text-textSecondary mb-3 line-clamp-2">{content}</p>

      <div className="flex flex-row justify-end">
        <Button onClick={onDetailClick} size="sm">
          안내서 보기
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
