import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
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
          activeClassName={cl.active}
          to={item.path}
          className={classNames(cl.SidebarItemRedesigned, { [cl.collapsed]: collapsed }, [])}
        >
          <Icon Svg={item.Icon} />
          {item.text}
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          to={item.path}
          className={classNames(cl.SidebarItem, { [cl.collapsed]: collapsed }, [])}
        >
          <item.Icon width="100%" height="100%" />
          {item.text}
        </AppLinkDeprecated>
      )}
    />
  );
});
