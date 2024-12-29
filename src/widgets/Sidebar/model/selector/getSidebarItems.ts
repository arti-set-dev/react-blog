import { createSelector } from '@reduxjs/toolkit';
import {
  getRouteMain, getRouteAbout, getRouteProfile, getRouteArticles,
} from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import ArticleIcon from '@/shared/assets/icons/articles-icon.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
      {
        path: getRouteMain(),
        Icon: HomeIcon,
        text: 'Main',
        authOnly: false,
      },
      {
        path: getRouteAbout(),
        Icon: AboutIcon,
        text: 'About',
        authOnly: false,
      },
    ];

    if (userData) {
      sidebarItemsList.push(
        {
          // eslint-disable-next-line no-unsafe-optional-chaining
          path: getRouteProfile(userData?.id),
          Icon: ProfileIcon,
          text: 'Profile',
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          Icon: ArticleIcon,
          text: 'Articles',
          authOnly: true,
        },
      );
    }

    return sidebarItemsList;
  },
);
