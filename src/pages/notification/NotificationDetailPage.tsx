import { useParams } from 'react-router-dom';
import { useNotificationDetailQuery } from '@/hooks/queries/notification/useNotificationQuery';
import { NOTIFICATION_DETAIL_SECTIONS } from '@/constants/notification';
import BackButton from '@/components/common/BackButton';
import NotificationDetailSkeleton from '@/components/skeleton/notification/NotificationDetailSkeleton';
import NotificationSection from '@/components/notification/NotificationSection';
import NotFoundPage from '@/pages/NotFoundPage';

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { notificationDetail, isLoading } = useNotificationDetailQuery(id!);

  if (isLoading) return <NotificationDetailSkeleton />;

  if (!notificationDetail) return <NotFoundPage />;

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-30 pt-44 pb-20">
        <BackButton />
        <h3 className="text-heading-h3 text-black font-semibold mt-16">
          {notificationDetail.title}
        </h3>

        <div className="flex flex-wrap gap-8 mt-6">
          {notificationDetail.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-8 py-2 text-body-sm text-textSecondary border border-borderSecondary bg-bgSecondary rounded-16"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <main className="flex flex-col flex-1 overflow-y-auto p-30 bg-bgTertiary mb-24 no-scrollbar space-y-24">
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
