import { useMutation } from '@tanstack/react-query';
import { postSmishingMessage } from '@/apis/smishing';

export const useSmishingMutation = (onSuccess: () => void, onError: () => void) => {
  return useMutation({
    mutationFn: postSmishingMessage,
    onSuccess,
    onError,
  });
};
