import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { useNotificationList } from '../../api/notificationApi';
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack
            gap="16"
            tag="div"
          >
            <Skeleton width="100%" border="10px" />
            <Skeleton width="100%" border="10px" />
            <Skeleton width="100%" border="10px" />
            <Skeleton width="100%" border="10px" />
          </VStack>
        )}
        off={(
          <VStack
            gap="16"
            tag="div"
          >
            <SkeletonDeprecated width="100%" border="10px" />
            <SkeletonDeprecated width="100%" border="10px" />
            <SkeletonDeprecated width="100%" border="10px" />
            <SkeletonDeprecated width="100%" border="10px" />
          </VStack>
        )}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack
            tag="div"
          >
            <Text variant="error">
              {t('There was an error loading notifications')}
            </Text>
          </VStack>
        )}
        off={(
          <VStack
            tag="div"
          >
            <TextDeprecated theme={TextTheme.ERROR}>
              {t('There was an error loading notifications')}
            </TextDeprecated>
          </VStack>
        )}
      />
    );
  }

  return (
    <VStack
      tag="ul"
      gap="16"
    >
      {notifications?.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </VStack>
  );
};
