import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useAllNotificationsQuery } from '@/hooks/queries/notification/useNotificationQuery';
import NotificationCard from '@/components/notification/NotificationCard';
import BackButton from '@/components/common/BackButton';
import { LoadingDog, NoDataDog } from '@/assets/svg';

const NotificationPage = () => {
  const { notifications, isLoading } = useAllNotificationsQuery();
  const navigate = useNavigate();

  const handleNotificationClick = (id: number) => {
    navigate(`${PATH.NOTIFICATIONS}/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full min-h-screen justify-center items-center text-center">
        <img src={LoadingDog} alt="로딩" className="w-full" />
        <h3 className="text-heading-h3 font-semibold">
          정보를 가지고 오고 있어요
          <br />
          조금만 기다려주세요!
        </h3>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col h-full min-h-screen justify-center items-center text-center">
        <img src={NoDataDog} alt="no-data" className="w-full" />
        <h3 className="text-heading-h3 font-semibold">등록된 알림장이 없습니다</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0  px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold py-4">알림장</h3>
        <p className="text-body-md text-textSecondary pb-12">
          요즘 어떤 이슈가 떠오르고 있는지 <br />
          그리고 어떻게 대응하면 좋을지 알려드릴게요!
        </p>
      </header>

      <main className="flex flex-col items-center flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        {notifications.map((notification) => (
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
