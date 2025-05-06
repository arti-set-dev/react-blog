export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profiles',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  ARTICLES_CREATE = 'articles_create',
  ARTICLES_EDIT = 'articles_edit',
  FORBBIDDEN = 'forbidden',
  SERVES_RULES = 'service_rules',
  PRIVACY_POLICY = 'privacy_policy',
  VERIFY_PROFILE = 'verify_profile',
  // last
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteForbidden = () => '/forbidden';
export const getRouteServiceRules = () => '/service_rules';
export const getRoutePrivacyPolicy = () => '/privacy_policy';
export const getRouteVerifyProfile = () => '/verify_profile';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLES_DETAILS,
  [getRouteArticleCreate()]: AppRoutes.ARTICLES_CREATE,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLES_EDIT,
  [getRouteForbidden()]: AppRoutes.FORBBIDDEN,
  [getRouteServiceRules()]: AppRoutes.SERVES_RULES,
  [getRoutePrivacyPolicy()]: AppRoutes.PRIVACY_POLICY,
  [getRouteVerifyProfile()]: AppRoutes.VERIFY_PROFILE,
};
