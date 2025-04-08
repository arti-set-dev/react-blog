import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createArticle: build.mutation<Article, FormData>({
      query: (formData) => ({
        url: '/posts',
        method: 'POST',
        body: formData,
        headers: {},
        formData: true,
      }),
    }),
  }),
});

export const useCreateArticle = articleApi.useCreateArticleMutation;
