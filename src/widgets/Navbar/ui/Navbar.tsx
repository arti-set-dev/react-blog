import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from '@/shared/const/router';
import { NotificationList } from '@/entities/Notification';
import {
  getUserAuthData, userActions, isUserAdmin, isUserManager,
} from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Drawer } from '@/shared/ui/Drawer';
import { Popover, Dropdown } from '@/shared/ui/Popups';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';
import NotificationIcon from '@/shared/assets/icons/notification-icon.svg';
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
          <AppLink to={RoutePath.articles_create} className={cl.NewPostText}>{t('Create new post')}</AppLink>
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
        <Button theme={ButtonTheme.OUTLINE} onClick={onShowModal}>{t('Login')}</Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </header>
  );
});
