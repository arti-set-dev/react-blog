import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageIsError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageIsView = (state: StateSchema) => state.articlesPage?.view || ArticleView.COLUMN;
export const getArticlesPageIsLimit = (state: StateSchema) => state.articlesPage?.limit || 13;
export const getArticlesPageIsNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageIsHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageIsInited = (state: StateSchema) => state.articlesPage?._inited;
export const getArticlesPageIsOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesPageIsSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED;
export const getArticlesPageIsSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesPageIsType = (state: StateSchema) => state.articlesPage?.types ?? ArticleType.ALL;
