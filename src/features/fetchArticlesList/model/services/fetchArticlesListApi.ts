import { Article, ArticleType } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchArticlesParams {
  type?: ArticleType;
  limit?: number;
  page?: number;
  sort?: 'createdAt' | 'views';
  order?: 'ASC' | 'DESC';
  search?: string;
}

interface ArticlesResponse {
  items: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchArticlesList: build.query<Article[], FetchArticlesParams>({
      query: ({
        type,
        limit = 15,
        page = 1,
        sort = 'createdAt',
        order = 'DESC',
        search,
      }) => ({
        url: '/posts',
        params: {
          limit,
          page,
          sort,
          order,
          search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      }),
      transformResponse: (response: ArticlesResponse, meta, arg) => {
        const filteredItems = arg.type === ArticleType.ALL
          ? response.items
          : response.items.filter((article) => article.type.includes(arg.type!));

        return filteredItems;
      },
    }),
  }),
});

export const useFetchArticlesList = articlesApi.useFetchArticlesListQuery;
