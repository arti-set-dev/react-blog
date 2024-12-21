import {
  isUserAdmin, isUserManager, userActions, getUserAuthData,
} from 'entitie/User';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Dropdown } from 'shared/ui/Popups';
import cl from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <Dropdown
      items={[
        ...(isAdminPanelAvailable ? [{
          content: t('Admin'),
          href: RoutePath.admin_panel,
        }] : []),
        {
          content: t('Profile'),
          href: `${RoutePath.profile}${authData?.id}`,
        },
        {
          content: t('Logout'),
          onclick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData?.avatar} alt={authData?.username} />}
    />
  );
};
