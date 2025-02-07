import { ReactElement } from 'react';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { AppRoutes } from '@/shared/const/router';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLES_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
