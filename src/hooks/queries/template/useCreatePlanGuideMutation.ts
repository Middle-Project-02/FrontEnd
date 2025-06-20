import { useMutation } from '@tanstack/react-query';
import { createChangePlanGuideTemplate } from '@/apis/chatbot';

const useCreatePlanGuideMutation = () => {
  const createPlanGuideMutation = useMutation({
    mutationFn: createChangePlanGuideTemplate,
    onSuccess: (data) => {
      console.log('요금제 변경 가이드 템플릿 생성 성공:', data);
    },
  });

  return {
    mutateCreatePlanGuide: createPlanGuideMutation.mutate,
    isCreatingPlanGuide: createPlanGuideMutation.isPending,
    createPlanGuideError: createPlanGuideMutation.error,
  };
};

export default useCreatePlanGuideMutation;
