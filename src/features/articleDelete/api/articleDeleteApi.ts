import { rtkApi } from '@/shared/api/rtkApi';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation<void, string>({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const useDeleteArticle = articleApi.useDeleteArticleMutation;
