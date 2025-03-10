import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createArticle: build.mutation<Article, Article>({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        body: article,
      }),
    }),
  }),
});

export const useCreateArticle = articleApi.useCreateArticleMutation;
