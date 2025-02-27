import { createSelector } from '@reduxjs/toolkit';
import { toggleFeatures } from '../../../../shared/lib/features';
import {
  getRouteMain,
  getRouteAbout,
  getRouteProfile,
  getRouteArticles,
} from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import HomeIconDeprecated from '@/shared/assets/icons/home-icon.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about-icon.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-icon.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/articles-icon.svg';

import HomeIcon from '@/shared/assets/icons/home-icon-new.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon-new.svg';
import AboutIcon from '@/shared/assets/icons/about-icon-new.svg';
import ArticleIcon from '@/shared/assets/icons/article-icon-new.svg';
import { NavigationItemType } from '../../../../entities/Navigation/model/types/navigation';

export const getNavigationItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: NavigationItemType[] = [
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => HomeIconDeprecated,
        on: () => HomeIcon,
      }),
      text: 'Main',
      authOnly: false,
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
      text: 'About',
      authOnly: false,
    },
    {
      path: getRouteArticles(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => ArticleIconDeprecated,
        on: () => ArticleIcon,
      }),
      text: 'Articles',
      authOnly: false,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        // eslint-disable-next-line no-unsafe-optional-chaining
        path: getRouteProfile(userData?.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        text: 'Profile',
        authOnly: true,
      },
    );
  }

  return sidebarItemsList;
});
