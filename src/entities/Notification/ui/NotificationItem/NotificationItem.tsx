import { useTranslation } from 'react-i18next';
import { ReactElement } from 'react';
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
}

export const NotificationItem = (props: NotificationItemProps) => {
  const { className, notification, uiSwitcher } = props;
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
          {notification.href && (
            <AppLink to={notification.href}>{t('Go to link')}</AppLink>
          )}
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
          {notification.href && (
            <AppLinkDeprecated to={notification.href}>{t('Go to link')}</AppLinkDeprecated>
          )}
          {notification.isUiSwitch && (
            uiSwitcher
          )}
        </VStack>
      )}
    />
  );
};
