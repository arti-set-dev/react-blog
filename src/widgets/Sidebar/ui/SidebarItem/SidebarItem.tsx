import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/types/sidebar';
import cl from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;
  const isAuth = useSelector(getUserAuthData);
  const { t } = useTranslation();

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      activeClassName={cl.active}
      to={item.path}
      className={classNames(cl.SidebarItemRedesigned, { [cl.collapsed]: collapsed }, [])}
    >
      <Icon Svg={item.Icon} />
      {t(item.text)}
    </AppLink>
  );
});
