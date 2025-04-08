import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticlesParams {
  limit?: number;
}

interface ArticlesResponse {
  items: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], FetchArticlesParams>({
      query: ({
        limit = 15,
      }) => ({
        url: '/posts',
        params: {
          limit,
        },
      }),
      transformResponse: (response: ArticlesResponse, meta, arg) => response.items,
    }),
  }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
