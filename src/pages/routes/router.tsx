// import { createBrowserRouter } from 'react-router-dom';
// import BaseLayout from '@/components/layout/BaseLayout';
// import HomePage from '../HomePage';

// export const router = createBrowserRouter([
//   {
//     element: <BaseLayout />,
//     children: [
//       {
//         path: '/',
//         element: <HomePage />,
//       },
//     ],
//   },
// ]);
import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '@/components/layout/base/BaseLayout';
import HomePage from '../HomePage';
import PublicOnlyRoute from './PublicOnlyRoute';
import LoginPage from '../LoginPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../NotFoundPage';
import TestPage from '../TestPage';

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/test',
            element: <TestPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
