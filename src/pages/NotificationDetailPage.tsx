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
    <div className="flex flex-col h-full min-h-screen break-keep">
      <header className="sticky top-0 bg-white px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold mb-4">{notificationDetail.title}</h3>
        <div className="flex flex-wrap gap-3 pb-12">
          {notificationDetail.tags?.map((tag, idx) => (
            <Badge key={idx} variant="outline" color="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <main className="p-[30px] bg-bgTertiary flex flex-col">
        {sections.map((section, index) => (
          <section key={index} className="mb-[16px]">
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
