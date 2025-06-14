import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router';

/**
 * PublicOnlyRoute 컴포넌트는 인증되지 않은 사용자만 접근할 수 있는 라우트 보호 컴포넌트입니다.
 * 
 * @description
 * - 로그인한 사용자가 로그인/회원가입 등의 페이지에 접근할 경우,
 *   홈(`/`)으로 리다이렉트시켜 불필요하거나 위험한 접근을 차단합니다.
 * - 로그인이 되어 있지 않은 사용자만 내부 자식 라우트를 볼 수 있습니다.
 *
 * @returns {JSX.Element} 
 */
const PublicOnlyRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
