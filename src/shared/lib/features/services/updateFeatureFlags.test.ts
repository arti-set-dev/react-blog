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

    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload,
      },
    });

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

    thunk.api.patch.mockReturnValue(Promise.resolve({ data: {} }));

    await thunk.callThunk({ userId, newFeatures });

    expect(thunk.api.patch).toHaveBeenCalledWith(
      `/users/${userId}`,
      {
        features: {
          isArticleRatingEnabled: false,
          isCounterEnabled: true,
        },
      },
    );

    expect(mockReload).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });

  test('Обработка ошибки при обновлении', async () => {
    const newFeatures = {
      isArticleRatingEnabled: false,
    };

    const userId = '1';

    thunk.api.patch.mockRejectedValue(new Error('Error'));

    const consoleSpy = jest.spyOn(console, 'log');

    await thunk.callThunk({ userId, newFeatures });

    expect(thunk.api.patch).toHaveBeenCalledWith(
      `/users/${userId}`,
      {
        features: {
          isArticleRatingEnabled: false,
          isCounterEnabled: true,
        },
      },
    );

    expect(mockReload).not.toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });
});
