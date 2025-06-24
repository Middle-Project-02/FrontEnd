import { useMutation } from '@tanstack/react-query';
import { postSendChatMessage } from '@/apis/chatbot';

export const useSendChatMessageMutation = () => {
  return useMutation({
    mutationFn: (message: string) => postSendChatMessage(message),
  });
};
