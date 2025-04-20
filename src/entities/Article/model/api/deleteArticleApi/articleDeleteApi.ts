import { rtkApi } from '@/shared/api/rtkApi';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteArticle: build.mutation<void, string>({
      query: (articleId) => ({
        url: `/posts/${articleId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const useDeleteArticle = articleApi.useDeleteArticleMutation;
