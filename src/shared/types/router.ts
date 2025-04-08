import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
  SERVICE_RULES = 'service_rules',
  VERIFY_PROFILE = 'verify_profile',
}
