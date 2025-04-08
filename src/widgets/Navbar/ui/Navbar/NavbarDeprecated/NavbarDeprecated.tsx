import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthModal } from '@/features/AuthService';
import cl from './NavbarDeprecated.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NotificationButton } from '@/features/notificationButton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getRouteArticleCreate, getRouteMain } from '@/shared/const/router';
import { User } from '@/entities/User';
import { Container } from '@/shared/ui/redesigned/Container';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { AvatarDropdown } from '@/features/avatarDropdown';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

interface NavbarDeprecatedProps {
    className?: string;
    authData?: User;
    isAuthModal?: boolean;
    onCloseModal: () => void;
    onShowModal: () => void;
}

export const NavbarAuthDataDeprecated = () => {
  const { t } = useTranslation();
  return (
    <header className={classNames(cl.Navbar, {}, [])}>
      <Container className={cl.Container}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <AppLink to={getRouteArticleCreate()} className={cl.NewPostText}>
          {t('Create new post')}
        </AppLink>
        <HStack gap="16">
          <UiDesignSwitcher />
          <NotificationButton
            uiSwitcher={<UiDesignSwitcher variant="button" />}
          />
          <AvatarDropdown />
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

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Container className={cl.Container}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>
          {t('Login')}
        </Button>
        <AuthModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </header>
  );
});
