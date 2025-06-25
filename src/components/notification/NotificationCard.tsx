import { useCallback } from 'react';

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
}) => {
  const handleClick = useCallback(() => {
    if (onDetailClick) onDetailClick();
  }, [onDetailClick]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left bg-white rounded-20 shadow-shadow4 border border-borderSecondary p-24 space-y-12 hover:shadow-shadow8 transition-shadow"
    >
      <div className="flex items-center gap-8">
        <h4 className="font-semibold text-heading-h4 leading-tight">{title}</h4>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-8 py-2 text-body-xs text-textSecondary border border-borderSecondary rounded-12 bg-bgSecondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-body-md text-black leading-relaxed line-clamp-3">{summary}</p>

      <div className="flex justify-end">
        <span className="text-primary text-body-md font-semibold underline">자세히 보기</span>
      </div>
    </button>
  );
};

export default NotificationCard;
