import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';

const useLoginMutation = () => {
  const { setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      setIsLoggedIn(true);
      navigate(PATH.ROOT, { replace: true });
    },
  });

  return { mutatePostLogin: postLoginMutation.mutate };
};

export default useLoginMutation;
