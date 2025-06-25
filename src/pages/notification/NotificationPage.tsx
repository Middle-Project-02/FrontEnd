import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';
import NotificationCard from '@/components/notification/NotificationCard';
import BackButton from '@/components/common/BackButton';
import NotificationCardSkeleton from '@/components/skeleton/notification/NotificationCardSkeleton';

const NotificationPage = () => {
  const { notifications, isLoading } = useAllNotificationsQuery();
  const navigate = useNavigate();

  const handleNotificationClick = (id: number) => {
    navigate(`${PATH.NOTIFICATIONS}/${id}`);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white">
      <header className="sticky top-0 px-30 pt-44 pb-24 shadow-shadow2">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold mt-16">알림장</h3>
        <p className="text-body-md text-textSecondary mt-8">
          꼭 알아두셔야 할 <span className="text-primary font-semibold">디지털 소식</span>과<br />
          <span className="text-primary font-semibold">대처 방법</span>을 알려드릴게요!
        </p>
      </header>

      <main className="flex flex-col flex-1 overflow-y-auto p-30 pb-[85px] bg-bgTertiary no-scrollbar gap-8 space-y-20">
        {isLoading
          ? [...Array(4)].map((_, i) => <NotificationCardSkeleton key={i} />)
          : notifications?.map((notification) => (
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
