import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTemplate, getTemplateDetail, getTemplates, saveTemplate } from '@/apis/template';
import { Template, TemplateSaveRequest } from '@/types/template';

export const useTemplatesQuery = () => {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });

  return { templates, isLoading };
};

export const useTemplateDetailQuery = (templateId: number) => {
  const { data: templateDetail, isLoading } = useQuery<Template>({
    queryKey: ['template', templateId],
    queryFn: () => getTemplateDetail(templateId),
    enabled: !!templateId,
  });

  return { templateDetail, isLoading };
};

type MutationHandler = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useSaveTemplateMutation = ({ onSuccess, onError }: MutationHandler) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TemplateSaveRequest) => saveTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      onSuccess?.();
    },
    onError,
  });
};

export const useDeleteTemplateMutation = ({ onSuccess, onError }: MutationHandler) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      onSuccess?.();
    },
    onError,
  });
};
