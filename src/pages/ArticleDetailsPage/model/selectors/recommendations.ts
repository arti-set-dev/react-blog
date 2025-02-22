import { StateSchema } from '@/app/providers/StoreProvider';

export const
  getArticleRecommendationsIsloading = (state: StateSchema) => state.articleDetailsPage?.recommendations.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsPage?.recommendations?.error;
