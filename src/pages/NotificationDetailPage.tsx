import { useParams } from 'react-router-dom';
import { useNotificationDetailQuery } from '@/hooks/queries/notification/useNotificationQuery';
import BackButton from '@/components/common/BackButton';
import { Badge } from '@/components/ui/badge';
import { Impact, Issue, Solution } from '@/assets/svg';

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { notificationDetail } = useNotificationDetailQuery(id!);

  if (!notificationDetail) {
    return <p className="text-lg">로딩 중...</p>;
  }

  return (
    <div className="flex flex-col h-full min-h-screen break-keep">
      <div className="sticky top-0 bg-white px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold mb-4">{notificationDetail.title}</h3>
        <div className="flex flex-wrap gap-3 pb-12">
          {notificationDetail.tags?.map((tag, idx) => (
            <Badge key={idx} variant="outline" color="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-[30px] bg-bgTertiary flex flex-col">
        <section className="mb-[16px]">
          <div className="flex flex-row items-center gap-[6px] mb-[6px]">
            <img src={Issue} alt="issue" />
            <h4 className="text-heading-h4 font-semibold">무슨 일이 일어났나요?</h4>
          </div>
          <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px] text-body-lg">
            {notificationDetail.issue}
          </div>
        </section>
        <section className="mb-[16px]">
          <div className="flex flex-row items-center gap-[6px] mb-[6px]">
            <img src={Impact} alt="impact" />
            <h4 className="text-heading-h4 font-semibold">어떤 영향이 있나요?</h4>
          </div>
          <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px] text-body-lg">
            {notificationDetail.impact}
          </div>
        </section>
        <section className="mb-[16px]">
          <div className="flex flex-row items-center gap-[6px] mb-[6px]">
            <img src={Solution} alt="solution" />
            <h4 className="text-heading-h4 font-semibold">어떻게 대응해야 하나요?</h4>
          </div>
          <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px] text-body-lg">
            {notificationDetail.solution}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationDetailPage;
