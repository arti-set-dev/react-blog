import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
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

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <AppLink
          to={item.path}
          className={classNames(cl.SidebarItemRedesigned, { [cl.collapsed]: collapsed }, [])}
        >
          <item.Icon width="100%" height="100%" />
          {item.text}
        </AppLink>
      )}
      off={(
        <AppLink
          to={item.path}
          className={classNames(cl.SidebarItem, { [cl.collapsed]: collapsed }, [])}
        >
          <item.Icon width="100%" height="100%" />
          {item.text}
        </AppLink>
      )}
    />
  );
});
