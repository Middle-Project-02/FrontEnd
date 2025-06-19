import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/base/BaseLayout';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';
import NotificationPage from '@/pages/NotificationPage';
import NotificationDetailPage from '@/pages/NotificationDetailPage';
import TemplatesPage from './pages/TemplatesPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <BaseLayout />,
      children: [
        {
          path: '',
          element: <MainPage />,
          loader: requireAuth,
        },
        { path: PATH.NOTIFICATIONS, element: <NotificationPage /> },
        {
          path: PATH.NOTIFICATION_DETAIL,
          element: <NotificationDetailPage />,
        },
        { path: PATH.TEMPLATES, element: <TemplatesPage /> },
      ],
    },
    {
      path: PATH.LOGIN,
      element: <LoginPage />,
      loader: redirectIfAuthenticated,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
