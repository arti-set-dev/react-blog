import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { PageNotFound } from 'pages/PageNotFound';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { ArticlesPage } from 'pages/ArticlesPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLES_DETAILS = 'articles_details',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
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

  [AppRoutes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },

  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePath.articles_details}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <PageNotFound />,
  },
};
