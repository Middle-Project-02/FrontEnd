import { useEffect } from 'react';
import Loading from '@/components/common/Loading';
import useKakaoLoginMutation from '@/hooks/queries/auth/useKakaoLoginMutation';

const RedirectPage = () => {
  const { mutatePostKakaoLogin } = useKakaoLoginMutation();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      mutatePostKakaoLogin(code);
    }
  }, [mutatePostKakaoLogin]);

  return <Loading />;
};

export default RedirectPage;
