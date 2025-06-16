import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const { notifications } = useAllNotificationsQuery();
  const navigate = useNavigate();

  const handleNotificationClick = (id: string) => {
    navigate(`/notifications/${id}`);
  };

  if (!notifications) {
    return <div className="text-lg">로딩 중...</div>;
  }

  return (
    <div>
      {notifications.length === 0 ? (
        <div>알림장이 없습니다.</div>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.notificationId}
              onClick={() => handleNotificationClick(notification.notificationId)}
              className="text-white p-4 mb-4"
            >
              <p>{notification.notificationId}</p>
              <h2>{notification.title}</h2>
              <h3>{notification.tags}</h3>
              <p>{notification.issue.slice(0, 50)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default NotificationPage;
