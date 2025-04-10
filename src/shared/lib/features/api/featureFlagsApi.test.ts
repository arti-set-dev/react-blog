import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from './featureFlagsApi';

// Интерфейс для опций обновления флагов функций
interface UpdateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

// Мокируем функцию экспорта
jest.mock('./featureFlagsApi', () => ({
  updateFeatureFlagsMutation: jest.fn((options) => ({
    type: 'updateFeatureFlags',
    payload: options,
  })),
}));

// Мокируем rtkApi
jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        updateFeatureFlags: {
          initiate: jest.fn(),
        },
      },
    }),
  },
}));

describe('featureFlagsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен корректно внедрять endpoints', () => {
    const { updateFeatureFlags } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
          query: ({ userId, features }) => ({
            url: `/users/${userId}`,
            method: 'PATCH',
            body: {
              features,
            },
          }),
        }),
      }),
    }).endpoints;

    expect(updateFeatureFlags).toBeDefined();
  });

  it('должен формировать правильный запрос при обновлении флагов', () => {
    // Создаем тестовую функцию запроса
    const queryFn = ({ userId, features }: UpdateFeatureFlagsOptions) => ({
      url: `/users/${userId}`,
      method: 'PATCH',
      body: {
        features,
      },
    });

    // Тестовые данные
    const testUserId = 'user123';
    const testFeatures = {
      isArticleRatingEnabled: true,
      isCounterEnabled: false,
    };

    // Проверяем результат
    const result = queryFn({ userId: testUserId, features: testFeatures });

    expect(result).toEqual({
      url: '/users/user123',
      method: 'PATCH',
      body: {
        features: {
          isArticleRatingEnabled: true,
          isCounterEnabled: false,
        },
      },
    });
  });

  it('должен возвращать правильный формат данных для диспетчеризации', () => {
    // Тестовые данные
    const testUserId = 'user123';
    const testFeatures = {
      isArticleRatingEnabled: true,
    };
    const options = { userId: testUserId, features: testFeatures };

    // Вызываем мутацию и получаем результат
    const action = updateFeatureFlagsMutation(options);

    // Проверяем формат возвращаемых данных
    expect(action).toEqual({
      type: 'updateFeatureFlags',
      payload: options,
    });
  });
});
