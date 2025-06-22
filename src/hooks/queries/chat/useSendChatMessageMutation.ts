import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '@/apis/chatbot';

export const useSendChatMessageMutation = () => {
  return useMutation({
    mutationFn: (message: string) => sendChatMessage(message),
  });
};
