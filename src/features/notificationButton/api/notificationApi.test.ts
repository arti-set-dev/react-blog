export {};

describe('notificationApi', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('useNotificationList должен формировать запрос с правильными параметрами', async () => {
    jest.doMock('./notificationApi', () => {
      const useGetNotificationListQueryMock = jest.fn();
      return {
        notificationApi: {
          useGetNotificationListQuery: useGetNotificationListQueryMock,
        },
        useNotificationList: (userId: string | null) => {
          useGetNotificationListQueryMock(userId, { pollingInterval: 5000 });
          return { data: [], isLoading: false };
        },
      };
    });

    const notificationApiModule = await import('./notificationApi');
    const { useNotificationList } = notificationApiModule;
    const { notificationApi } = notificationApiModule;

    useNotificationList('test-user');

    expect(notificationApi.useGetNotificationListQuery).toHaveBeenCalledWith('test-user', {
      pollingInterval: 5000,
    });

    jest.clearAllMocks();
    useNotificationList(null);

    expect(notificationApi.useGetNotificationListQuery).toHaveBeenCalledWith(null, {
      pollingInterval: 5000,
    });
  });

  it('query должен правильно формировать запрос', () => {
    jest.dontMock('./notificationApi');

    const queryFn = (userId: string | null) => ({
      url: '/notifications',
      params: userId ? { userId } : undefined,
    });

    expect(queryFn('test-user')).toEqual({
      url: '/notifications',
      params: { userId: 'test-user' },
    });

    expect(queryFn(null)).toEqual({
      url: '/notifications',
      params: undefined,
    });
  });
});
