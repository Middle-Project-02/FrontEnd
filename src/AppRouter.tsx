import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PATH } from '@/constants/path';
import BaseLayout from '@/components/layout/base/BaseLayout';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import LandingPage from '@/pages/LandingPage';
import SmishingPage from '@/pages/smishing/SmishingPage';
import RankingPage from '@/pages/RankingPage';
import SmishingIntroPage from '@/pages/smishing/SmishingIntroPage';
import PlanChatBotPage from '@/pages/PlanChatBotPage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';
import NotificationPage from '@/pages/NotificationPage';
import NotificationDetailPage from '@/pages/NotificationDetailPage';
import RedirectPage from '@/pages/RedirectPage';
import SignUpPage from '@/pages/SignUp/SignUpPage';
import TemplatesPage from '@/pages/TemplatesPage';
import TemplateDetailPage from '@/pages/TemplateDetailPage';
import FontModePage from '@/pages/FontModePage';
import HomePage from '@/pages/HomePage';
import { requireAuth, redirectIfAuthenticated } from '@/utils/authLoader';
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
        },
        {
          path: PATH.SMISHING.PAGE,
          element: <SmishingPage />,
        },
        {
          path: PATH.QUIZ.PAGE,
          element: <QuizPage />,
        },
        {
          path: PATH.QUIZ.INTRO,
          element: <QuizIntroPage />,
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
          path: PATH.CHAT,
          element: <PlanChatBotPage />,
          loader: requireAuth,
        },
        { path: PATH.TEMPLATES, element: <TemplatesPage /> },
        { path: PATH.TEMPLATE_DETAIL, element: <TemplateDetailPage /> },
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
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
