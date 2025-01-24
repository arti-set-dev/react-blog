import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-icon.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const onOpenDrower = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDrower = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button
      onClick={onOpenDrower}
      theme={ButtonTheme.ICON}
      aria-label={t('Toggle notification')}
    >
      <Icon Svg={NotificationIcon} />
    </Button>
  );

  return (
    <>
      <BrowserView>
        <Popover direction="bottom left" trigger={trigger}>
          <NotificationList />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer lazy isOpen={isOpen} onClose={onCloseDrower}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  );
};
