import { getUserAuthData } from 'entitie/User';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
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
    <AppLink to={item.path} className={classNames(cl.SidebarItem, { [cl.collapsed]: collapsed }, [])}>
      <item.Icon />
      {item.text}
    </AppLink>
  );
});
