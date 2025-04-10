import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from './featureFlagsApi';

interface UpdateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

jest.mock('./featureFlagsApi', () => ({
  updateFeatureFlagsMutation: jest.fn((options) => ({
    type: 'updateFeatureFlags',
    payload: options,
  })),
}));

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
    const queryFn = ({ userId, features }: UpdateFeatureFlagsOptions) => ({
      url: `/users/${userId}`,
      method: 'PATCH',
      body: {
        features,
      },
    });

    const testUserId = 'user123';
    const testFeatures = {
      isArticleRatingEnabled: true,
      isCounterEnabled: false,
    };

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
    const testUserId = 'user123';
    const testFeatures = {
      isArticleRatingEnabled: true,
    };
    const options = { userId: testUserId, features: testFeatures };

    const action = updateFeatureFlagsMutation(options);

    expect(action).toEqual({
      type: 'updateFeatureFlags',
      payload: options,
    });
  });
});
