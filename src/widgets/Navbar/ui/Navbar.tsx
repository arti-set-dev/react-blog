import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Container } from '@/shared/ui/deprecated/Container';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { getRouteArticleCreate } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Navbar.module.scss';

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
          <Text size={TextSize.L}>{t('Logo App')}</Text>
          <AppLink to={getRouteArticleCreate()} className={cl.NewPostText}>
            {t('Create new post')}
          </AppLink>
          <HStack gap="16">
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
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>
          {t('Login')}
        </Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </header>
  );
});
