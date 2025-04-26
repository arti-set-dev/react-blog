/* eslint-disable react/no-unused-prop-types */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';
import { AuthModal } from '@/features/AuthService';
import cl from './NavbarDeprecated.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationButton } from '@/features/notificationButton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleCreate, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { logout, User } from '@/entities/User';
import { Container } from '@/shared/ui/redesigned/Container';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { AvatarDropdown } from '@/features/avatarDropdown';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { AvatarDrower } from '@/features/AvatarDrower';
import CreateIcon from '@/shared/assets/icons/create-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import LogoutIcon from '@/shared/assets/icons/logout-icon.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface NavbarDeprecatedProps {
    className?: string;
    authData?: User;
    isAuthModal?: boolean;
    onCloseModal: () => void;
    onShowModal?: () => void;
}

export const NavbarAuthDataDeprecated = (props: NavbarDeprecatedProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { authData } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className={classNames(cl.Navbar, {}, [])} data-testid="Navbar">
      <Container className={cl.Container}>
        <AppLink to={getRouteMain()} data-testid="Navbar.Logo">
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <HStack gap="16" align="center">
          <BrowserView renderWithFragment>
            <AppLink to={getRouteArticleCreate()} className={getHstack({ align: 'end', gap: 8 })}>
              <Icon color="inverted" width={18} height={18} Svg={CreateIcon} />
              {t('Create new post')}
            </AppLink>
            <UiDesignSwitcher />
          </BrowserView>
          <NotificationButton
            uiSwitcher={<UiDesignSwitcher variant="button" />}
          />
          <BrowserView renderWithFragment>
            <AvatarDropdown data-testid="Navbar.AvatarDropdown" />
          </BrowserView>
          <MobileView>
            <AvatarDrower isOpen={isOpen} onClose={onCloseDrawer} onOpen={onOpenDrawer}>
              <VStack tag="ul" gap="16">
                <HStack tag="li" fullWidth height={51}>
                  <UiDesignSwitcher variant="button" />
                </HStack>
                <HStack tag="li" fullWidth height={51}>
                  <AppLink
                    onClick={onCloseDrawer}
                    to={getRouteArticleCreate()}
                    className={getHstack({ align: 'end', gap: 8 })}
                  >
                    <Icon color="inverted" width={18} height={18} Svg={CreateIcon} />
                    {t('Create new post')}
                  </AppLink>
                </HStack>
                <HStack tag="li" fullWidth height={51}>
                  <AppLink
                    onClick={onCloseDrawer}
                    to={getRouteProfile(authData?.id ?? '')}
                    className={getHstack({ align: 'end', gap: 8 })}
                  >
                    <Icon color="inverted" width={18} height={18} Svg={ProfileIcon} />
                    {t('Profile')}
                  </AppLink>
                </HStack>
                <HStack tag="li" fullWidth height={51}>
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLogout}
                    className={getHstack({ align: 'center', gap: 8 })}
                  >
                    <Icon color="inverted" width={18} height={18} Svg={LogoutIcon} />
                    {t('Logout')}
                  </Button>
                </HStack>
              </VStack>
            </AvatarDrower>
          </MobileView>
        </HStack>
      </Container>
    </header>
  );
};

export const NavbarDeprecated = memo((props: NavbarDeprecatedProps) => {
  const {
    className, authData, isAuthModal, onCloseModal, onShowModal,
  } = props;
  const { t } = useTranslation();

  if (authData) {
    return <NavbarAuthDataDeprecated authData={authData} onCloseModal={onCloseModal} onShowModal={onShowModal} />;
  }

  return (
    <header className={classNames(cl.Navbar, {}, [className])} data-testid="Navbar">
      <Container className={cl.Container}>
        <AppLink to={getRouteMain()} data-testid="Navbar.Logo">
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onShowModal}
          data-testid="Navbar.LoginButton"
        >
          {t('Login')}
        </Button>
        {isAuthModal && <AuthModal isOpen={isAuthModal} onClose={onCloseModal} data-testid="AuthModal" />}
      </Container>
    </header>
  );
});
