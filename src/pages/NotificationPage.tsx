import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';
import NotificationCard from '@/components/notification/NotificationCard';
import BackButton from '@/components/common/BackButton';

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
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <div className="sticky top-0 bg-white px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold mb-4">알림장</h3>
        <p className="text-body-md text-textSecondary pb-12">
          요즘 어떤 이슈가 떠오르고 있는지 <br />
          그리고 어떻게 대응하면 좋을지 알려드릴게요!
        </p>
      </div>

      <div className="flex flex-col items-center flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.notificationId}
              title={notification.title}
              tags={notification.tags || []}
              summary={notification.summary}
              onDetailClick={() => handleNotificationClick(notification.notificationId)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center mt-60">
            <img src="/images/glasses.png" alt="알림장 없음" className="w-full mb-4" />
            <h3 className="text-heading-h3 font-semibold">알림장이 없습니다.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
