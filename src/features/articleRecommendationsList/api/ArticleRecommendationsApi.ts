import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

interface FetchArticlesParams {
  limit?: number;
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], FetchArticlesParams>({
      query: ({
        limit = 15,
      }) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
