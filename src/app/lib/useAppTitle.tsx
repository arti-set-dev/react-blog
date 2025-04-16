import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { AppRoutes } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';

export function useAppTitle() {
  const appRoute = useRouteChange();
  const article = useSelector(getArticleDetailsData);
  const { t } = useTranslation();

  useEffect(() => {
    let title = 'Netowork';

    switch (appRoute) {
    case AppRoutes.MAIN:
      title = `Netowork | ${t('Home')}`;
      break;
    case AppRoutes.ABOUT:
      title = `Netowork | ${t('About')}`;
      break;
    case AppRoutes.ARTICLES:
      title = `Netowork | ${t('Articles')}`;
      break;
    case AppRoutes.ARTICLES_DETAILS:
      if (article?.title) {
        title = `Netowork | ${article.title}`;
      } else {
        title = `Netowork | ${t('Loading...')}`;
      }
      break;
    case AppRoutes.ARTICLES_EDIT:
      if (article?.title) {
        title = `Netowork | ${article.title}`;
      } else {
        title = `Netowork | ${t('Loading...')}`;
      }
      break;
    case AppRoutes.PROFILE:
      title = `Netowork | ${t('Profile')}`;
      break;
    case AppRoutes.ARTICLES_CREATE:
      title = `Netowork | ${t('Create an article')}`;
      break;
    case AppRoutes.PRIVACY_POLICY:
      title = `Netowork | ${t('Privacy Policy')}`;
      break;
    default:
      title = 'Netowork';
    }

    document.title = title;
  }, [appRoute, article?.title, t]);
}
