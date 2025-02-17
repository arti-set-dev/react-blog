import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
import { getUserAuthData } from '@/entities/User';
import { NavigationItemType } from '../model/types/navigation';

export interface NavigationItemProps {
  item: NavigationItemType;
}

export const NavigationItem = memo((props: NavigationItemProps) => {
  const { item } = props;
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
          to={item.path}
        >
          {t(item.text)}
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          to={item.path}
        >
          {item.Icon && <item.Icon width="25px" height="25px" />}
          {t(item.text)}
        </AppLinkDeprecated>
      )}
    />
  );
});
