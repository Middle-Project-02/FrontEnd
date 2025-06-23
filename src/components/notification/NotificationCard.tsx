import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NotificationCardProps {
  title: string;
  tags: string[];
  summary: string;
  onDetailClick?: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  tags,
  summary,
  onDetailClick,
}) => (
  <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px]">
    <h2 className="font-semibold text-heading-h4 mb-1">{title}</h2>
    <div className="flex flex-row gap-3 mb-5 flex-wrap">
      {tags.map((tag, idx) => (
        <Badge key={idx} variant="outline" color="primary" size="sm">
          {tag}
        </Badge>
      ))}
    </div>
    <p className="text-body-md text-textSecondary mb-3">{summary}</p>
    <div className="flex flex-row justify-end">
      <Button onClick={onDetailClick} size="sm">
        자세히 보기
      </Button>
    </div>
  </div>
);

export default NotificationCard;
