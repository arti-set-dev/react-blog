import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';
import { Notification } from '../../model/types/notification';
import cl from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const { className, notification } = props;
  const { t } = useTranslation();

  return (
    <VStack tag="li" gap="4" className={classNames(cl.NotificationItem, {}, [className])}>
      <Text size={TextSize.M}>{notification.title}</Text>
      <Text>{notification.description}</Text>
      {notification.href
        && <AppLink to={notification.href}>{t('Go to link')}</AppLink>}
    </VStack>
  );
};
