import { NotificationList } from 'entitie/Notification';
import { useState, useCallback } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import { BrowserView, MobileView } from 'react-device-detect';
import cl from './NotificationButton.module.scss';

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
    <Button onClick={onOpenDrower} theme={ButtonTheme.ICON} aria-label={t('Toggle notification')}>
      <Icon Svg={NotificationIcon} />
    </Button>
  );

  return (
    <>
      <BrowserView>
        <Popover
          direction="bottom left"
          trigger={trigger}
        >
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
