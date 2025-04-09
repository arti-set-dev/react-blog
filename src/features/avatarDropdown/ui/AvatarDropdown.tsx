import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { getRouteProfile } from '@/shared/const/router';
import {
  getUserAuthData,
  logout,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const items = [
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
  ];

  return (

    <Dropdown
      items={items}
      trigger={
        <Avatar size={25} src={authData?.avatar} alt={authData?.username} />
      }
    />

  );
};
