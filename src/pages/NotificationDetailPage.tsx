import { useParams } from 'react-router-dom';
import { useNotificationDetailQuery } from '@/hooks/queries/notification/useNotificationQuery';
import BackButton from '@/components/common/BackButton';
import { Badge } from '@/components/ui/badge';
import { Impact, Issue, LoadingDog, NoDataDog, Solution } from '@/assets/svg';

const NotificationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { notificationDetail, isLoading } = useNotificationDetailQuery(id!);

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

  if (!notificationDetail) {
    return (
      <div className="flex flex-col h-full min-h-screen justify-center items-center text-center">
        <img src={NoDataDog} alt="no-data" className="w-full" />
        <h3 className="text-heading-h3 font-semibold">해당 알림장 데이터가 없습니다</h3>
      </div>
    );
  }

  const sections = [
    {
      title: '무슨 일이 일어났나요?',
      content: notificationDetail.issue,
      icon: Issue,
      alt: 'issue',
    },
    {
      title: '어떤 영향이 있나요?',
      content: notificationDetail.impact,
      icon: Impact,
      alt: 'impact',
    },
    {
      title: '어떻게 대응해야 하나요?',
      content: notificationDetail.solution,
      icon: Solution,
      alt: 'solution',
    },
  ];

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
        {sections.map((section, idx) => (
          <section key={idx} className="mb-[16px]">
            <div className="flex items-center gap-[6px] mb-[6px]">
              <img src={section.icon} alt={section.alt} />
              <h4 className="text-heading-h4 font-semibold">{section.title}</h4>
            </div>
            <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px] text-body-lg">
              {section.content}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default NotificationDetailPage;
