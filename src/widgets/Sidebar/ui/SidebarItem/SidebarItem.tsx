import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <AppLink
          Svg={item.Icon}
          activeClassName={cl.active}
          to={item.path}
          className={classNames(cl.SidebarItemRedesigned, { [cl.collapsed]: collapsed }, [])}
        >
          {t(item.text)}
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          to={item.path}
          className={classNames(cl.SidebarItem, { [cl.collapsed]: collapsed }, [])}
        >
          <item.Icon width="25px" height="25px" />
          {t(item.text)}
        </AppLinkDeprecated>
      )}
    />
  );
});
