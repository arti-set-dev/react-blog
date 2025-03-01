import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleView } from '../../consts/consts';
import { ArticleSortField, ArticleType } from '../../types/articleType';

export const getArticlesListIsLoading = (state: StateSchema) => state.articlesList?.isLoading || false;
export const getArticlesListError = (state: StateSchema) => state.articlesList?.error;
export const getArticlesListView = (state: StateSchema) => state.articlesList?.view || ArticleView.COLUMN;
export const getArticlesListNum = (state: StateSchema) => state.articlesList?.page || 1;
export const getArticlesListLimit = (state: StateSchema) => state.articlesList?.limit || 13;
export const getArticlesListIsHasMore = (state: StateSchema) => state.articlesList?.hasMore;
export const getArticlesListIsInited = (state: StateSchema) => state.articlesList?._inited;
export const getArticlesListOrder = (state: StateSchema) => state.articlesList?.order ?? 'asc';
export const getArticlesListSort = (state: StateSchema) => state.articlesList?.sort ?? ArticleSortField.CREATED;
export const getArticlesListSearch = (state: StateSchema) => state.articlesList?.search ?? '';
export const getArticlesListType = (state: StateSchema) => state.articlesList?.types ?? ArticleType.ALL;
