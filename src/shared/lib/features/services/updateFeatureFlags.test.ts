import { updateFeatureFlag } from './updateFeatureFlags';
import { getAllFeatureFlags } from '../lib/setGetFeatures';
import { TestAsyncThunk } from '../../tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('../lib/setGetFeatures', () => ({
  getAllFeatureFlags: jest.fn(),
}));

describe('updateFeatureFlag', () => {
  let thunk: TestAsyncThunk<void, { userId: string; newFeatures: object }, string>;
  const mockReload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    thunk = new TestAsyncThunk(updateFeatureFlag);

    // Мокаем window.location.reload
    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload,
      },
    });

    // Устанавливаем мок значение для getAllFeatureFlags
    (getAllFeatureFlags as jest.Mock).mockReturnValue({
      isArticleRatingEnabled: true,
      isCounterEnabled: true,
    });
  });

  test('Успешное обновление', async () => {
    const newFeatures = {
      isArticleRatingEnabled: false,
    };

    const userId = '1';

    // Мокаем успешный ответ API
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: {} }));

    await thunk.callThunk({ userId, newFeatures });

    // Проверяем, что API вызывается с правильными параметрами
    expect(thunk.api.patch).toHaveBeenCalledWith(
      `/users/${userId}`,
      {
        features: {
          isArticleRatingEnabled: false,
          isCounterEnabled: true,
        },
      },
    );

    // Проверяем, что страница перезагружается
    expect(mockReload).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });

  test('Обработка ошибки при обновлении', async () => {
    const newFeatures = {
      isArticleRatingEnabled: false,
    };

    const userId = '1';

    // Мокаем ошибку API
    thunk.api.patch.mockRejectedValue(new Error('Error'));

    // Шпионим за console.log
    const consoleSpy = jest.spyOn(console, 'log');

    await thunk.callThunk({ userId, newFeatures });

    // Проверяем, что API вызывается с правильными параметрами
    expect(thunk.api.patch).toHaveBeenCalledWith(
      `/users/${userId}`,
      {
        features: {
          isArticleRatingEnabled: false,
          isCounterEnabled: true,
        },
      },
    );

    // Проверяем, что страница НЕ перезагружается при ошибке
    expect(mockReload).not.toHaveBeenCalled();

    // Проверяем, что ошибка логируется
    expect(consoleSpy).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });
});
