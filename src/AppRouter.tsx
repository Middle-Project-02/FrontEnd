import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/base/BaseLayout';
import LoginPage from '@/pages/LoginPage';
import LandingPage from '@/pages/LandingPage';
import SmishingPage from '@/pages/smishing/SmishingPage';
import RankingPage from '@/pages/RankingPage';
import SmishingIntroPage from '@/pages/smishing/SmishingIntroPage';
import PlanChatBotPage from '@/pages/PlanChatBotPage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';
import NotificationPage from '@/pages/notification/NotificationPage';
import NotificationDetailPage from '@/pages/notification/NotificationDetailPage';
import RedirectPage from '@/pages/RedirectPage';
import ServerErrorPage from '@/pages/errorBoundary/ServerErrorPage';
import NotFoundPage from '@/pages/errorBoundary/NotFoundPage';
import UnauthorizedPage from '@/pages/errorBoundary/UnauthorizedPage';
import MyPage from '@/pages/MyPage';
import SignUpPage from '@/pages/SignUp/SignUpPage';
import TemplatesPage from '@/pages/template/TemplatesPage';
import TemplateDetailPage from '@/pages/template/TemplateDetailPage';
import FontModePage from '@/pages/FontModePage';
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/quiz/QuizPage';
import QuizIntroPage from '@/pages/quiz/QuizIntroPage';

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
      path: PATH.REDIRECT,
      element: <RedirectPage />,
    },
    {
      path: PATH.SERVER_ERROR,
      element: <ServerErrorPage />,
    },
    {
      path: PATH.NOT_FOUND,
      element: <NotFoundPage />,
    },
    {
      path: PATH.UNAUTHORIZED,
      element: <UnauthorizedPage />,
    },
    {
      path: PATH.SIGNUP,
      element: <SignUpPage />,
    },
    {
      path: PATH.FONTMODE,
      element: <FontModePage />,
      loader: requireAuth,
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
          path: PATH.QUIZ.PAGE,
          element: <QuizPage />,
          loader: requireAuth,
        },
        {
          path: PATH.QUIZ.INTRO,
          element: <QuizIntroPage />,
          loader: requireAuth,
        },
        {
          path: PATH.NOTIFICATIONS,
          element: <NotificationPage />,
          loader: requireAuth,
        },
        {
          path: PATH.NOTIFICATION_DETAIL,
          element: <NotificationDetailPage />,
          loader: requireAuth,
        },
        {
          path: PATH.CHAT,
          element: <PlanChatBotPage />,
          loader: requireAuth,
        },
        {
          path: PATH.MYPAGE,
          element: <MyPage />,
          loader: requireAuth,
        },
        { path: PATH.TEMPLATES, element: <TemplatesPage />, loader: requireAuth },
        { path: PATH.TEMPLATE_DETAIL, element: <TemplateDetailPage />, loader: requireAuth },
        {
          path: PATH.RANKING,
          element: <RankingPage />,
        },
        {
          path: PATH.HOME,
          element: <HomePage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
