import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotificationList } from '../../api/notificationApi';
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';
import cl from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    data: notifications,
    error,
    isLoading,
  } = useNotificationList(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        tag="div"
        className={classNames(cl.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" border="10px" />
        <Skeleton width="100%" border="10px" />
        <Skeleton width="100%" border="10px" />
        <Skeleton width="100%" border="10px" />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack
        tag="div"
        className={classNames(cl.NotificationList, {}, [className])}
      >
        <Text theme={TextTheme.ERROR}>
          {t('There was an error loading notifications')}
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      tag="ul"
      className={classNames(cl.NotificationList, {}, [className])}
    >
      {notifications?.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </VStack>
  );
};
