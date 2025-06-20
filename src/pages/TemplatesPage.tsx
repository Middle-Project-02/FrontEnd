import { useNavigate } from 'react-router-dom';
import { useTemplatesQuery } from '@/hooks/queries/template/useTemplateQueries';
import { PATH } from '@/constants/path';
import BackButton from '@/components/common/BackButton';
import Loading from '@/components/common/Loading';
import TemplateCard from '@/components/template/TemplateCard';

const TemplatesPage = () => {
  const { templates = [], isLoading } = useTemplatesQuery();
  const navigate = useNavigate();

  const handleTemplateClick = (id: number) => {
    navigate(`${PATH.TEMPLATES}/${id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold py-4">
          <span className="text-primary">테스트</span> 님이 만들었던 안내서예요.
        </h3>

        <p className="text-body-md text-textSecondary pb-12">
          내용이 길 수 있으니, 아래 <span className="text-primary">[안내서 보기] </span>
          버튼을 눌러 전체 내용을 확인해 보세요!
        </p>
      </header>

      <main className="flex flex-col items-center flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            content={template.content}
            onDetailClick={() => handleTemplateClick(template.id)}
          />
        ))}
      </main>
    </div>
  );
};

export default TemplatesPage;
