import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Container } from '@/shared/ui/deprecated/Container';
import { getRouteArticleCreate, getRouteMain } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Navbar.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import LogoIcon from '@/shared/assets/icons/logo.svg';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cl.Navbar, {}, [className])}>
        <Container className={cl.Container}>
          <AppLink to={getRouteMain()}>
            <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
          </AppLink>
          <AppLink to={getRouteArticleCreate()} className={cl.NewPostText}>
            {t('Create new post')}
          </AppLink>
          <HStack gap="16">
            <UiDesignSwitcher />
            <NotificationButton />
            <AvatarDropdown />
          </HStack>
        </Container>
      </header>
    );
  }

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Container className={cl.Container}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>
          {t('Login')}
        </Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </header>
  );
});
