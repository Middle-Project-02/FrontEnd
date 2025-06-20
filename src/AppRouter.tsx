import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/base/BaseLayout';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import LandingPage from '@/pages/LandingPage';
import SmishingPage from '@/pages/smishing/SmishingPage';
import SmishingIntroPage from '@/pages/smishing/SmishingIntroPage';
import NotificationPage from '@/pages/NotificationPage';
import NotificationDetailPage from '@/pages/NotificationDetailPage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <LandingPage />,
    },
    {
      path: PATH.LOGIN,
      element: <LoginPage />,
      loader: redirectIfAuthenticated,
    },
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: PATH.SMISHING.INTRO,
          element: <SmishingIntroPage />,
          loader: requireAuth,
        },
        {
          path: PATH.SMISHING.PAGE,
          element: <SmishingPage />,
          loader: requireAuth,
        },
        {
          path: PATH.NOTIFICATIONS,
          element: <NotificationPage />,
        },
        {
          path: PATH.NOTIFICATION_DETAIL,
          element: <NotificationDetailPage />,
        },
        {
          path: PATH.MAIN,
          element: <MainPage />,
          loader: requireAuth,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
