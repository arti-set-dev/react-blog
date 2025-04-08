import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '../types/article';

export const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateArticle: build.mutation<Article, { id: string; data: Partial<Article> }>({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useUpdateArticleMutation } = articleApi;
