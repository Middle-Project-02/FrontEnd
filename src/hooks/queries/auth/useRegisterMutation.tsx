import { useMutation } from '@tanstack/react-query';
import { postRegister } from '@/apis/auth';
import { makeToast } from '@/utils/makeToast';

const useRegisterMutation = () => {
  const postRegisterMutation = useMutation({
    mutationFn: postRegister,
    onError: () => {
      makeToast('회원 가입에 실패했어요. 잠시 후 다시 시도해 주세요.', 'warning');
    },
  });

  return { mutatePostRegister: postRegisterMutation.mutateAsync };
};

export default useRegisterMutation;
