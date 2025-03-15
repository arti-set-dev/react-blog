import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/PageNotFound';
import { ProfilePage } from '@/pages/ProfilePage';
import { ServiceRulesPage } from '@/pages/ServiceRulesPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import {
  AppRoutes,
  getRouteForbidden,
  getRouteAdminPanel,
  getRouteArticleEdit,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticles,
  getRouteProfile,
  getRouteAbout,
  getRouteMain, getRouteServiceRules, getRoutePrivacyPolicy,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },

  [AppRoutes.ABOUT]: {
    path: getRouteAbout(),
    element: <AboutPage />,
  },

  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: false,
  },

  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: false,
  },

  [AppRoutes.ARTICLES_DETAILS]: {
    path: getRouteArticleDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: false,
  },

  [AppRoutes.ARTICLES_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoutes.ARTICLES_EDIT]: {
    path: getRouteArticleEdit(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },

  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminPanel(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN],
  },

  [AppRoutes.FORBBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },

  [AppRoutes.SERVES_RULES]: {
    path: getRouteServiceRules(),
    element: <ServiceRulesPage />,
  },

  [AppRoutes.PRIVACY_POLICY]: {
    path: getRoutePrivacyPolicy(),
    element: <PrivacyPolicyPage />,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
