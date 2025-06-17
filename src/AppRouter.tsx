import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/base/BaseLayout';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import SmishingPage from '@/pages/SmishingPage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';

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
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
          loader: redirectIfAuthenticated,
        },
        {
          path: 'smishing',
          element: <SmishingPage />,
          loader: requireAuth,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
