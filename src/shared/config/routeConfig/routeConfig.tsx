import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { PageNotFound } from 'pages/PageNotFound';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    NOT_FOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  // last
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },

  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },

  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.notFound,
    element: <PageNotFound />,
  },
};
