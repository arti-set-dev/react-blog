import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: HomeIcon,
    text: 'Main',
    authOnly: false,
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'About',
    authOnly: false,
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Profile',
    authOnly: true,
  },
];
