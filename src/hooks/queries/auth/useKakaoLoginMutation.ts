import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postKakaoLogin } from '@/apis/auth';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';

const useKakaoLoginMutation = () => {
  const { setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const postKakaoLoginMutation = useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: (content) => {
      setIsLoggedIn(true);

      if (content.isFirstLogin) {
        navigate(PATH.FONTMODE);
      } else {
        navigate(PATH.HOME, { replace: true });
      }
    },
  });

  return { mutatePostKakaoLogin: postKakaoLoginMutation.mutate };
};

export default useKakaoLoginMutation;
