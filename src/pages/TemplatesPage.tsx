import { useTemplatesQuery } from '@/hooks/queries/template/useTemplateQueries';

const TemplatesPage = () => {
  const { templates = [] } = useTemplatesQuery();

  if (!templates) return <div>로딩중...</div>;

  return (
    <div>
      <h2>내 템플릿 모아보기</h2>
      {templates.map((template) => (
        <div key={template.id}>
          <h3>{template.title}</h3>
          <p>{template.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
