import { useMutation } from '@tanstack/react-query';
import { postRegister } from '@/apis/auth';
import { makeToast } from '@/utils/makeToast';

const useRegisterMutation = () => {
  const postRegisterMutation = useMutation({
    mutationFn: postRegister,
    onError: () => {
      makeToast('해당 번호로 이미 가입된 계정이 있어요.', 'warning');
    },
  });

  return { mutatePostRegister: postRegisterMutation.mutateAsync };
};

export default useRegisterMutation;
