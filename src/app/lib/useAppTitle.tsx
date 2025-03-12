import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { AppRoutes } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';

export function useAppTitle() {
  const appRoute = useRouteChange();
  const article = useSelector(getArticleDetailsData);

  useEffect(() => {
    let title = 'Netowork';

    switch (appRoute) {
    case AppRoutes.MAIN:
      title = 'Netowork | Home';
      break;
    case AppRoutes.ABOUT:
      title = 'Netowork | About';
      break;
    case AppRoutes.ARTICLES:
      title = 'Netowork | Articles';
      break;
    case AppRoutes.ARTICLES_DETAILS:
      if (article?.title) {
        title = `Netowork | ${article.title}`;
      } else {
        title = 'Netowork | Loading...';
      }
      break;
    case AppRoutes.ARTICLES_EDIT:
      if (article?.title) {
        title = `Netowork | ${article.title}`;
      } else {
        title = 'Netowork | Loading...';
      }
      break;
    case AppRoutes.PROFILE:
      title = 'Netowork | Profile';
      break;
    default:
      title = 'Netowork';
    }

    document.title = title;
  }, [appRoute, article?.title]);
}
