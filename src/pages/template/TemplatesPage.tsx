import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import { useTemplatesQuery } from '@/hooks/queries/template/useTemplateQueries';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import BackButton from '@/components/common/BackButton';
import TemplateCard from '@/components/template/TemplateCard';
import TemplateCardSkeleton from '@/components/skeleton/template/TemplateCardSkeleton';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { userInformation, isLoading: isUserLoading } = useUserInfoQuery();
  const { templates = [], isLoading: isTemplateLoading } = useTemplatesQuery(!!userInformation);

  const handleTemplateClick = (id: number) => {
    navigate(`${PATH.TEMPLATES}/detail/${id}`);
  };

  const renderMainContent = () => {
    if (isUserLoading || isTemplateLoading) {
      return [...Array(4)].map((_, i) => <TemplateCardSkeleton key={i} />);
    }
    if (templates.length === 0) {
      return (
        <div className="text-center text-body-lg text-textSecondary mt-12">
          아직 만들어진 안내서가 없어요.
          <br />
          챗봇을 통해 요금제 추천을 받아보세요!
        </div>
      );
    }

    return templates.map((template) => (
      <TemplateCard
        key={template.id}
        title={template.title}
        content={template.content}
        onDetailClick={() => handleTemplateClick(template.id)}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full max-w-[360px] pt-44 overflow-y-auto bg-white">
      <header className="sticky top-0 px-30 pb-12">
        <BackButton />
        <h3 className="text-heading-h3 font-semibold py-4">
          <span className="text-primary">{userInformation?.nickname}</span> 님이 만들었던
          안내서예요.
        </h3>
        <p className="text-body-md text-textSecondary pb-12">
          내용이 길 수 있으니, 아래 <span className="text-primary">[안내서 보기] </span>
          버튼을 눌러 전체 내용을 확인해 보세요!
        </p>
      </header>

      <main className="flex flex-col flex-1 overflow-y-auto px-30 pt-20 pb-24 bg-bgTertiary no-scrollbar space-y-20">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default TemplatesPage;
