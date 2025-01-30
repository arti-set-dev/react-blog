import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-icon.svg';
import NotificationIcon from '@/shared/assets/icons/notification-icon-new.svg';

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
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Button
          onClick={onOpenDrower}
          variant="icon"
          aria-label={t('Toggle notification')}
        >
          <Icon Svg={NotificationIcon} width="100%" height="100%" />
        </Button>
      )}
      off={(
        <ButtonDeprecated
          onClick={onOpenDrower}
          theme={ButtonTheme.ICON}
          aria-label={t('Toggle notification')}
        >
          <IconDeprecated Svg={NotificationIconDeprecated} width="100%" height="100%" />
        </ButtonDeprecated>
      )}
    />
  );

  return (
    <>
      <BrowserView>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <Popover direction="bottom left" trigger={trigger}>
              <NotificationList />
            </Popover>
          )}
          off={(
            <PopoverDeprecated direction="bottom left" trigger={trigger}>
              <NotificationList />
            </PopoverDeprecated>
          )}
        />
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
