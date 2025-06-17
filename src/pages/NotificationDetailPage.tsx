import { useNotificationDetailQuery } from '@/hooks/queries/notification/useNotificationQuery';
import { useNavigate, useParams } from 'react-router-dom';

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const notificationDetail = useNotificationDetailQuery(id!);

  const handleBackClick = () => {
    navigate('/notifications');
  };

  if (!notificationDetail) {
    return <p className="text-lg">로딩 중...</p>;
  }

  return (
    <>
      <div>
        <button className="bg-pink-200 w-20" onClick={handleBackClick}>
          뒤로가기
        </button>
      </div>
      <div>
        <p>{notificationDetail.title}</p>
        <p>{notificationDetail.tags?.join(' ')}</p>
        <p>{notificationDetail.summary}</p>
        <p>{notificationDetail.issue}</p>
        <p>{notificationDetail.impact}</p>
        <p>{notificationDetail.solution}</p>
      </div>
    </>
  );
};

export default NotificationDetailPage;
