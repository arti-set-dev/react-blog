/* eslint-disable react/no-unused-prop-types */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { AuthModal } from '@/features/AuthService';
import { getRouteArticleCreate, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { logout, User } from '@/entities/User';
import { Container } from '@/shared/ui/redesigned/Container';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Button } from '@/shared/ui/redesigned/Button';
import CreateIcon from '@/shared/assets/icons/create-icon.svg';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDrower } from '@/features/AvatarDrower';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import LogoutIcon from '@/shared/assets/icons/logout-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon-new.svg';

interface NavbarRedesignedProps {
    className?: string;
    authData?: User;
    isAuthModal?: boolean;
    onCloseModal: () => void;
    onShowModal?: () => void;
}

const NAVBAR_HEIGHT = 70;

export const NavbarAuthDataRedesigned = (props: NavbarRedesignedProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { authData } = props;
  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <Card tag="header" offset="0" border="0" height={NAVBAR_HEIGHT} className={getHstack({ align: 'center' })}>
      <Container max className={getHstack({ gap: 16, justify: 'between', align: 'center' })}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>

        <HStack gap="16" align="center">
          <BrowserView renderWithFragment>
            <AppLink isHovered to={getRouteArticleCreate()} className={getHstack({ align: 'end', gap: 8 })}>
              <Icon color="inverted" width={18} height={18} Svg={CreateIcon} />
              {t('Create new post')}
            </AppLink>
            <UiDesignSwitcher />
          </BrowserView>
          <NotificationButton
            uiSwitcher={<UiDesignSwitcher variant="button" />}
          />
          <BrowserView renderWithFragment>
            <AvatarDropdown />
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
                    isHovered
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
                    isHovered
                    to={getRouteProfile(authData?.id ?? '')}
                    className={getHstack({ align: 'end', gap: 8 })}
                  >
                    <Icon color="inverted" width={18} height={18} Svg={ProfileIcon} />
                    {t('Profile')}
                  </AppLink>
                </HStack>
                <HStack tag="li" fullWidth height={51}>
                  <Button variant="text-primary" onClick={onLogout} className={getHstack({ align: 'center', gap: 8 })}>
                    <Icon color="inverted" width={18} height={18} Svg={LogoutIcon} />
                    {t('Logout')}
                  </Button>
                </HStack>
              </VStack>
            </AvatarDrower>
          </MobileView>
        </HStack>
      </Container>
    </Card>
  );
};

export const NavbarRedesigned = memo((props: NavbarRedesignedProps) => {
  const {
    className, authData, isAuthModal, onCloseModal, onShowModal,
  } = props;
  const { t } = useTranslation();

  return (
    <Card tag="header" border="0" offset="0" height={NAVBAR_HEIGHT} className={getHstack({ align: 'center' })}>
      <Container max className={getHstack({ gap: 16, justify: 'between', align: 'center' })}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <Button variant="outline" onClick={onShowModal}>
          {t('Login')}
        </Button>
        <AuthModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </Card>
  );
});
