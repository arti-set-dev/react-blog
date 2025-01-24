import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import {
  isUserAdmin,
  isUserManager,
  userActions,
  getUserAuthData,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

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
        ...(isAdminPanelAvailable
          ? [
            {
              content: t('Admin'),
              href: getRouteAdminPanel(),
            },
          ]
          : []),
        ...(authData
          ? [
            {
              content: t('Profile'),
              href: getRouteProfile(authData.id),
            },
          ]
          : []),
        {
          content: t('Logout'),
          onclick: onLogout,
        },
      ]}
      trigger={
        <Avatar size={25} src={authData?.avatar} alt={authData?.username} />
      }
    />
  );
};
