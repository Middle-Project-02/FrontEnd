import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTemplate, getTemplateDetail, getTemplates, postSaveTemplate } from '@/apis/template';
import { Template, TemplateSaveRequest } from '@/types/template';
import { makeToast } from '@/utils/makeToast';

export const useTemplatesQuery = (enabled: boolean = true) => {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: getTemplates,
    enabled,
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

interface MutationHandler {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useSaveTemplateMutation = ({ onSuccess, onError }: MutationHandler) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TemplateSaveRequest) => postSaveTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      makeToast('안내서가 저장되었습니다.', 'success');
      onSuccess?.();
    },
    onError: () => {
      makeToast('안내서 저장에 실패했습니다. 다시 시도해주세요.', 'warning');
      onError?.();
    },
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
