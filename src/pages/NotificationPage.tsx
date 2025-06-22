import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';
import NotificationCard from '@/components/notification/NotificationCard';
import BackButton from '@/components/common/BackButton';
import NotificationCardSkeleton from '@/components/skeleton/notification/NotificationSkeleton';
import NotFoundPage from './NotFoundPage';

const NotificationPage = () => {
  const { notifications, isLoading } = useAllNotificationsQuery();
  const navigate = useNavigate();

  const handleNotificationClick = (id: number) => {
    navigate(`${PATH.NOTIFICATIONS}/${id}`);
  };
  if (!notifications) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold py-4">알림장</h3>
        <p className="text-body-md text-textSecondary pb-12">
          요즘 어떤 이슈가 떠오르고 있는지 <br />
          그리고 어떻게 대응하면 좋을지 알려드릴게요!
        </p>
      </header>

      <main className="flex flex-col flex-1 pb-[100px] overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        {isLoading
          ? [...Array(4)].map((_, i) => <NotificationCardSkeleton key={i} />)
          : notifications.map((notification) => (
              <NotificationCard
                key={notification.notificationId}
                title={notification.title}
                tags={notification.tags || []}
                summary={notification.summary}
                onDetailClick={() => handleNotificationClick(notification.notificationId)}
              />
            ))}
      </main>
    </div>
  );
};

export default NotificationPage;
