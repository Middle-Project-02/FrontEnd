import { useMutation } from '@tanstack/react-query';
import { postCheckPhoneNumber } from '@/apis/auth';
import { makeToast } from '@/utils/makeToast';

const usePhoneNumberMutation = () => {
  const postPhoneNumberMutation = useMutation({
    mutationFn: postCheckPhoneNumber,
    onError: () => {
      makeToast('해당 번호로 이미 가입된 계정이 있어요.', 'warning');
    },
  });

  return { mutatePostCheckPhoneNumber: postPhoneNumberMutation.mutateAsync };
};

export default usePhoneNumberMutation;
