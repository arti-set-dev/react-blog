import {
  FC, memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Container } from 'shared/ui/Container/Container';
import { List } from 'shared/ui/List/List';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthData, userActions, isUserAdmin, isUserManager,
} from 'entitie/User';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cl from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cl.Navbar, {}, [className])}>
        <Container className={cl.Container}>
          <Text size={TextSize.L}>{t('Logo App')}</Text>
          <AppLink to={RoutePath.articles_create} className={cl.NewPostText}>{t('Create new post')}</AppLink>
          <Dropdown
            items={[
              ...(isAdminPanelAvailable ? [{
                content: t('Admin'),
                href: RoutePath.admin_panel,
              }] : []),
              {
                content: t('Profile'),
                href: RoutePath.profile + authData.id,
              },
              {
                content: t('Logout'),
                onclick: onLogout,
              },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} alt={authData.username} />}
          />
        </Container>
      </header>
    );
  }

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Container className={cl.Container}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>{t('Login')}</Button>
        {isAuthModal
          && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
      </Container>
    </header>
  );
});
