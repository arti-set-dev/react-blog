import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteArticleCreate, getRouteMain } from '@/shared/const/router';
import { User } from '@/entities/User';
import { Container } from '@/shared/ui/redesigned/Container';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { LoginModal } from '@/features/AuthByUsername';

import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarRedesignedProps {
    className?: string;
    authData?: User;
    isAuthModal?: boolean;
    onCloseModal: () => void;
    onShowModal: () => void;
}

const NAVBAR_HEIGHT = 70;

export const NavbarAuthDataRedesigned = () => {
  const { t } = useTranslation();
  return (
    <Card tag="header" offset="0" border="0" height={NAVBAR_HEIGHT} className={getHstack({ align: 'center' })}>
      <Container max className={getHstack({ gap: 16, justify: 'between', align: 'center' })}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>

        <HStack gap="16" align="center">
          <AppLink isHovered to={getRouteArticleCreate()}>
            {t('Create new post')}
          </AppLink>
          <UiDesignSwitcher />
          <NotificationButton
            uiSwitcher={<UiDesignSwitcher variant="button" />}
          />
          <AvatarDropdown />
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
    <Card tag="header" offset="0" height={NAVBAR_HEIGHT} className={getHstack({ align: 'center' })}>
      <Container max className={getHstack({ gap: 16, justify: 'between', align: 'center' })}>
        <AppLink to={getRouteMain()}>
          <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
        </AppLink>
        <Button variant="outline" onClick={onShowModal}>
          {t('Login')}
        </Button>
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      </Container>
    </Card>
  );
});
