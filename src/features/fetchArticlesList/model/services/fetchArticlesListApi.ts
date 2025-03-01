import { Article, ArticleType } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticlesParams {
  type?: ArticleType;
  limit?: number;
}

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchArticlesList: build.query<Article[], FetchArticlesParams>({
      query: ({
        type,
        limit = 8,
      }) => ({
        url: '/articles',
        params: {
          _limit: limit,
          type_like: type === ArticleType.ALL ? undefined : type,
        },
      }),
      transformResponse: (response: Article[], meta, arg) => (arg.type === ArticleType.ALL
        ? response
        : response.filter((article) => article.type.includes(arg.type!))),
    }),
  }),
});

export const useFetchArticlesList = articlesApi.useFetchArticlesListQuery;
