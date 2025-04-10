import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        getProfileRating: {
          useQuery: jest.fn().mockReturnValue({}),
        },
        rateProfile: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
      },
    }),
  },
}));

describe('profileRatingApi', () => {
  it('должен корректно внедрять endpoints', () => {
    const { getProfileRating, rateProfile } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getProfileRating: build.query<Rating[], { userId: number; profileId: number }>({
          query: ({ profileId, userId }) => ({
            url: '/profileRatings',
            params: {
              profileId,
              userId,
            },
          }),
        }),
        rateProfile: build.mutation<void, { userId: number; profileId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/profileRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints;

    expect(getProfileRating).toBeDefined();
    expect(rateProfile).toBeDefined();
  });

  it('должен вызывать getProfileRating query с правильными параметрами', () => {
    const { getProfileRating } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getProfileRating: build.query<Rating[], { userId: number; profileId: number }>({
          query: ({ profileId, userId }) => ({
            url: '/profileRatings',
            params: {
              profileId,
              userId,
            },
          }),
        }),
      }),
    }).endpoints;

    getProfileRating.useQuery({ userId: 1, profileId: 1 });

    expect(getProfileRating.useQuery).toHaveBeenCalledWith({ userId: 1, profileId: 1 });
  });

  it('должен вызывать rateProfile mutation с правильными параметрами', () => {
    const [rateProfile] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        rateProfile: build.mutation<void, { userId: number; profileId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/profileRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints.rateProfile.useMutation();

    const ratingData = {
      userId: 1,
      profileId: 2,
      rate: 4,
      feedback: 'Отличный профиль!',
    };

    rateProfile(ratingData);

    expect(rateProfile).toHaveBeenCalledWith(ratingData);
  });

  it('должен обрабатывать ошибку при неудачном оценивании профиля', () => {
    const error = { status: 500, data: { message: 'Ошибка сервера' } };
    const [rateProfile] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        rateProfile: build.mutation<void, { userId: number; profileId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/profileRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints.rateProfile.useMutation();

    (rateProfile as jest.Mock).mockRejectedValue(error);

    const ratingData = {
      userId: 1,
      profileId: 2,
      rate: 4,
    };

    return expect(rateProfile(ratingData)).rejects.toEqual(error);
  });
});
