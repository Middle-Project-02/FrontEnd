import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteTemplateMutation,
  useTemplateDetailQuery,
} from '@/hooks/queries/template/useTemplateQueries';
import { PATH } from '@/constants/path';
import BackButton from '@/components/common/BackButton';
import Loading from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import NotFoundPage from './NotFoundPage';

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const templateId = Number(id);
  const navigate = useNavigate();

  const { templateDetail, isLoading } = useTemplateDetailQuery(templateId);
  const { mutate: deleteTemplate } = useDeleteTemplateMutation({
    onSuccess: () => navigate(PATH.TEMPLATES),
    onError: () => alert('삭제 실패!'),
  });

  if (isLoading) return <Loading />;
  if (!templateDetail) return <NotFoundPage />;

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 text-primary font-semibold py-4">{templateDetail.title}</h3>
        <p className="text-body-md text-textSecondary pb-12">
          이 안내서는 대리점에 보여주기 위해 만들어졌어요.
        </p>
      </header>
      <main className="flex flex-col items-center flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        <h4 className="text-heading-h4 font-semibold">요금제 변경 안내서</h4>
        <p className="text-body-lg">{templateDetail.content}</p>
      </main>
      <Button variant="destructive" onClick={() => deleteTemplate(templateId)}>
        이 안내서 지우기
      </Button>
    </div>
  );
};

export default TemplateDetailPage;
