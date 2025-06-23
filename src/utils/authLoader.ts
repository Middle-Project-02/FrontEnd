import { redirect } from 'react-router-dom';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';

export const requireAuth = () => {
  const { isLoggedIn } = useAuthStore.getState();
  if (!isLoggedIn) {
    return redirect(PATH.UNAUTHORIZED);
  }

  return null;
};

export const redirectIfAuthenticated = () => {
  const { isLoggedIn } = useAuthStore.getState();

  if (isLoggedIn) {
    return redirect(PATH.ROOT);
  }

  return null;
};
