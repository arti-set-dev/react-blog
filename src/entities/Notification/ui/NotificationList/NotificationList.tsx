import { useTranslation } from 'react-i18next';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Notification } from '../../model/types/notification';

interface NotificationListProps {
  className?: string;
  id?: string;
  notifications?: Notification[];
  isLoading?: boolean;
  error?: FetchBaseQueryError | string | SerializedError | undefined;
  uiSwitcher?: ReactElement;
}

export const NotificationList = (props: NotificationListProps) => {
  const {
    className, id, notifications, isLoading, error, uiSwitcher,
  } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack
            gap="16"
            tag="div"
          >
            <Skeleton width="100%" border="10" />
            <Skeleton width="100%" border="10" />
            <Skeleton width="100%" border="10" />
            <Skeleton width="100%" border="10" />
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

  if (!notifications?.length) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <VStack
            tag="div"
          >
            <Text size="m">
              {t('No notifications')}
            </Text>
          </VStack>
        )}
        off={(
          <VStack
            tag="div"
          >
            <TextDeprecated size={TextSize.M}>
              {t('No notifications')}
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
        <NotificationItem uiSwitcher={uiSwitcher} notification={notification} key={notification.id} />
      ))}
    </VStack>
  );
};
