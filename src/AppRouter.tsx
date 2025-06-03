import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/BaseLayout';
import MainPage from '@/pages/MainPage';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <BaseLayout />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
