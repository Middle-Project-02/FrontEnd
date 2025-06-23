import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/apis/auth';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';
import useFontModeStore from '@/stores/fontModeStore';

const useLoginMutation = () => {
  const { setIsLoggedIn } = useAuthStore();
  const { setFontMode } = useFontModeStore();
  const navigate = useNavigate();

  const postLoginMutation = useMutation({
    mutationFn: postLogin,
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

  return { mutatePostLogin: postLoginMutation.mutateAsync };
};

export default useLoginMutation;
