import { useState, useCallback, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-icon-new.svg';
import { getUserAuthData } from '@/entities/User';
import { useNotificationList } from '../api/notificationApi';

interface NotificationButtonProps {
  className?: string;
  uiSwitcher?: ReactElement;
}

export const NotificationButton = (props: NotificationButtonProps) => {
  const { className, uiSwitcher } = props;
  const { t } = useTranslation();
  const user = useSelector(getUserAuthData);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: notifications,
    error,
    isLoading,
  } = useNotificationList(user?.id ?? null);

  const onOpenDrower = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDrower = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button
      onClick={onOpenDrower}
      variant="icon"
      aria-label={t('Toggle notification')}
      notification={notifications?.length}
    >
      <Icon Svg={NotificationIcon} width="100%" height="100%" />
    </Button>
  );

  return (
    <>
      <BrowserView>
        <Popover direction="bottom left" trigger={trigger}>
          <NotificationList
            uiSwitcher={uiSwitcher}
            notifications={notifications}
            isLoading={isLoading}
            error={error}
          />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <Drawer lazy isOpen={isOpen} onClose={onCloseDrower}>
          <NotificationList
            uiSwitcher={uiSwitcher}
            notifications={notifications}
            isLoading={isLoading}
            error={error}
          />
        </Drawer>
      </MobileView>
    </>
  );
};
