import { createSelector } from '@reduxjs/toolkit';
import {
  getRouteMain,
  getRouteAbout,
  getRouteProfile,
  getRouteArticles,
} from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';

import { NavigationItemType } from '../../../../entities/Navigation/model/types/navigation';

export const getFooterItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: NavigationItemType[] = [
    {
      path: getRouteMain(),
      text: 'Main',
      authOnly: false,
    },
    {
      path: getRouteAbout(),
      text: 'About',
      authOnly: false,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        // eslint-disable-next-line no-unsafe-optional-chaining
        path: getRouteProfile(userData?.id),
        text: 'Profile',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'Articles',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
