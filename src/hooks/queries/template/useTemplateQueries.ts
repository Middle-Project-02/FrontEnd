import { deleteTemplate, getTemplateDetail, getTemplates, saveTemplate } from '@/apis/template';
import { Template } from '@/types/template';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTemplatesQuery = () => {
  const { data: templates } = useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });

  return { templates };
};

const useTemplateDetailQuery = (templateId: number) => {
  const { data: templateDetail } = useQuery<Template>({
    queryKey: ['template', templateId],
    queryFn: () => getTemplateDetail(templateId),
    enabled: !!templateId,
  });

  return { templateDetail };
};

const useSaveTemplateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (rawContent: string) => saveTemplate(rawContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
  return { mutateSaveTemplate: mutation.mutate };
};

const useDeleteTemplateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
  return { mutateDeleteTemplate: mutation.mutate };
};

export {
  useTemplatesQuery,
  useTemplateDetailQuery,
  useSaveTemplateMutation,
  useDeleteTemplateMutation,
};
