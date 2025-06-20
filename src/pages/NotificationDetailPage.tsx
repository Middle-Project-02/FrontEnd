import { useParams } from 'react-router-dom';
import { useNotificationDetailQuery } from '@/hooks/queries/notification/useNotificationQuery';
import { NOTIFICATION_DETAIL_SECTIONS } from '@/constants/notification';
import BackButton from '@/components/common/BackButton';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/common/Loading';
import NotificationSection from '@/components/notification/NotificationSection';
import NotFoundPage from './NotFoundPage';

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { notificationDetail, isLoading } = useNotificationDetailQuery(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (!notificationDetail) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold py-4">{notificationDetail.title}</h3>
        <div className="flex flex-wrap gap-3 pb-12">
          {notificationDetail.tags?.map((tag, idx) => (
            <Badge key={idx} variant="outline" color="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <main className="flex flex-col items-center flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        {NOTIFICATION_DETAIL_SECTIONS.map((section) => (
          <NotificationSection
            key={section.key}
            title={section.title}
            content={notificationDetail[section.key]}
            icon={section.icon}
            alt={section.alt}
          />
        ))}
      </main>
    </div>
  );
};

export default NotificationDetailPage;
