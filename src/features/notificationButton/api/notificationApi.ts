import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

export const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationList: build.query<Notification[], string | null>({
      query: (userId) => ({
        url: '/notifications',
        params: userId ? { userId } : undefined,
      }),
    }),
  }),
});

export const
  useNotificationList = (userId: string | null) => notificationApi.useGetNotificationListQuery(userId ?? null, {
    pollingInterval: 5000,
  });
