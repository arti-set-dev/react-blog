import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Notification } from '../../model/types/notification';
import cl from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
  uiSwitcher?: ReactElement;
  onCloseDrawer?: () => void;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const {
    className, notification, uiSwitcher, onCloseDrawer,
  } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          tag="li"
          max
          offset="16"
          className={classNames(getVstack({ gap: 8 }))}
        >
          <Text size="m">{notification.title}</Text>
          <Text>{notification.description}</Text>
          <BrowserView>
            {notification.href && (
              <AppLink to={notification.href}>{notification.hrefDescr}</AppLink>
            )}
          </BrowserView>
          <MobileView>
            {notification.href && (
              <AppLink
                isHovered
                to={notification.href}
                onClick={onCloseDrawer}
              >
                {notification.hrefDescr}
              </AppLink>
            )}
          </MobileView>
          {notification.isUiSwitch && (
            uiSwitcher
          )}
        </Card>
      )}
      off={(
        <VStack
          tag="li"
          gap="4"
          className={classNames(cl.NotificationItem, {}, [className])}
        >
          <TextDeprecated size={TextSize.M}>{notification.title}</TextDeprecated>
          <TextDeprecated>{notification.description}</TextDeprecated>
          <BrowserView>
            {notification.href && (
              <AppLinkDeprecated to={notification.href}>{notification.hrefDescr}</AppLinkDeprecated>
            )}
          </BrowserView>
          <MobileView>
            {notification.href && (
              <AppLinkDeprecated
                to={notification.href}
                onClick={onCloseDrawer}
              >
                {notification.hrefDescr}
              </AppLinkDeprecated>
            )}
          </MobileView>
          {notification.isUiSwitch && (
            uiSwitcher
          )}
        </VStack>
      )}
    />
  );
};
