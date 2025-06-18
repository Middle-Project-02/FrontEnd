import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';

const NotificationPage = () => {
  const { notifications } = useAllNotificationsQuery();
  const navigate = useNavigate();

  const handleNotificationClick = (id: number) => {
    navigate(`${PATH.NOTIFICATIONS}/${id}`);
  };

  if (!notifications) {
    return <p className="text-lg">로딩 중...</p>;
  }

  return (
    <div>
      {notifications.length === 0 ? (
        <p>알림장이 없습니다.</p>
      ) : (
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.notificationId}
              onClick={() => handleNotificationClick(notification.notificationId)}
              className="p-4 mb-4 cursor-pointer"
            >
              <p>{notification.notificationId}</p>
              <p>{notification.title}</p>
              <p>{notification.tags?.join(' ')}</p>
              <p>{notification.summary.slice(0, 50)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default NotificationPage;
