import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
