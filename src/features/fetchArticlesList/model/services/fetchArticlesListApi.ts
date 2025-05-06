import { Article, ArticleType } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticlesParams {
  type?: ArticleType;
  limit?: number;
  page?: number;
  sort?: 'createdAt' | 'views';
  order?: 'asc' | 'desc';
  search?: string;
}

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchArticlesList: build.query<Article[], FetchArticlesParams>({
      query: ({
        type,
        limit = 15,
        page = 1,
        sort = 'createdAt',
        order = 'desc',
        search,
      }) => ({
        url: '/articles',
        params: {
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      }),
      transformResponse: (response: Article[], meta, arg) => {
        if (!Array.isArray(response)) {
          return [];
        }

        const filteredItems = arg.type === ArticleType.ALL
          ? response
          : response.filter((article) => article.type.includes(arg.type!));

        return filteredItems;
      },
    }),
  }),
});

export const useFetchArticlesList = articlesApi.useFetchArticlesListQuery;
