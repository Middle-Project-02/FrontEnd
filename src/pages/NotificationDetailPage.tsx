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
    return <div className="text-lg">로딩 중...</div>;
  }

  return (
    <>
      <div>
        <button className="bg-pink-200 w-20" onClick={handleBackClick}>
          뒤로가기
        </button>
      </div>
      <div className="text-white">
        <h1>{notificationDetail.title}</h1>
        <h3>{notificationDetail.tags}</h3>
        <p>{notificationDetail.issue}</p>
        <p>{notificationDetail.solution}</p>
      </div>
    </>
  );
};

export default NotificationDetailPage;
