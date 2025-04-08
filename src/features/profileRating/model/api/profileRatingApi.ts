import type { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetProfileRatingArg {
  userId: number;
  profileId: number;
}

interface RateProfileArg {
  userId: number;
  profileId: number;
  rate: number;
  feedback?: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[], GetProfileRatingArg>({
      query: ({ profileId, userId }) => ({
        url: '/profileRatings',
        params: {
          profileId,
          userId,
        },
      }),
    }),
    rateProfile: build.mutation<void, RateProfileArg>({
      query: (arg) => ({
        url: '/profileRatings',
        method: 'post',
        body: arg,
      }),
    }),
  }),
});

export const useProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
