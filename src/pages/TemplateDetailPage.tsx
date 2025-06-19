import {
  useDeleteTemplateMutation,
  useTemplateDetailQuery,
} from '@/hooks/queries/template/useTemplateQueries';

const TemplateDetailPage = (id: number) => {
  const { templateDetail } = useTemplateDetailQuery(id);
  const { mutateDeleteTemplate: deleteTemplate } = useDeleteTemplateMutation();

  if (!templateDetail) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{templateDetail.title}</h2>
      <p>{templateDetail.content}</p>
      <button onClick={() => deleteTemplate(id)}>삭제하기</button>
    </div>
  );
};

export default TemplateDetailPage;
