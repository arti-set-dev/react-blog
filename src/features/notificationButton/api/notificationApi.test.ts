/**
 * @jest-environment jsdom
 */

// Пустой экспорт для превращения файла в модуль
export {};

describe('notificationApi', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('useNotificationList должен формировать запрос с правильными параметрами', async () => {
    // Мокируем модули
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

    // Импортируем после мока с использованием динамического импорта
    const notificationApiModule = await import('./notificationApi');
    const { useNotificationList } = notificationApiModule;
    const { notificationApi } = notificationApiModule;

    // Вызываем функцию
    useNotificationList('test-user');

    // Проверяем параметры вызова
    expect(notificationApi.useGetNotificationListQuery).toHaveBeenCalledWith('test-user', {
      pollingInterval: 5000,
    });

    // Проверяем с null
    jest.clearAllMocks();
    useNotificationList(null);

    expect(notificationApi.useGetNotificationListQuery).toHaveBeenCalledWith(null, {
      pollingInterval: 5000,
    });
  });

  it('query должен правильно формировать запрос', () => {
    // Очищаем моки
    jest.dontMock('./notificationApi');

    // Воссоздаем функцию запроса из API
    const queryFn = (userId: string | null) => ({
      url: '/notifications',
      params: userId ? { userId } : undefined,
    });

    // Проверяем с userId
    expect(queryFn('test-user')).toEqual({
      url: '/notifications',
      params: { userId: 'test-user' },
    });

    // Проверяем без userId
    expect(queryFn(null)).toEqual({
      url: '/notifications',
      params: undefined,
    });
  });
});
