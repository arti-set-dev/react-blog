import type { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
  userId: number;
  articleId: number;
}

interface RareArticleArg {
  userId: number;
  articleId: number;
  rate: number;
  feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ articleId, userId }) => ({
        url: '/articleRatings',
        params: {
          articleId,
          userId,
        },
      }),
    }),
    rareArticle: build.mutation<void, RareArticleArg>({
      query: (arg) => ({
        url: '/articleRatings',
        method: 'post',
        body: arg,
      }),
    }),
  }),
});

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRareArticleMutation;
