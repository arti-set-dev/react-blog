import { Article, ArticleSortField } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';
import { SortOrder } from '@/shared/types/SortOrder';

interface ArticlePopularApiOptions {
  limit?: number;
  order?: SortOrder;
  sort?: ArticleSortField;
}

const popularApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticlePopularList: build.query<Article[], ArticlePopularApiOptions>({
      query: ({ limit, sort, order }) => ({
        url: '/articles',
        params: {
          _limit: limit,
          _sort: sort,
          _order: order,
        },
      }),
    }),
  }),
});

export const useArticlePopularList = popularApi.useGetArticlePopularListQuery;
