import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postKakaoLogin } from '@/apis/auth';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';
import useFontModeStore from '@/stores/fontModeStore';

const useKakaoLoginMutation = () => {
  const { setIsLoggedIn } = useAuthStore();
  const { setFontMode } = useFontModeStore();
  const navigate = useNavigate();

  const postKakaoLoginMutation = useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: (content) => {
      const redirectPath = localStorage.getItem('redirectAfterLogin');

      setIsLoggedIn(true);

      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath, { replace: true });
      } else if (content.isFirstLogin) {
        navigate(PATH.FONTMODE);
      } else {
        setFontMode(content.fontMode);
        navigate(PATH.HOME, { replace: true });
      }
    },
  });

  return { mutatePostKakaoLogin: postKakaoLoginMutation.mutate };
};

export default useKakaoLoginMutation;
