import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entitie/Article';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const getArticlesPageIsError = (state: StateSchema) => state.articlesPage?.error;
export const getArticlesPageIsView = (state: StateSchema) => state.articlesPage?.view || ArticleView.COLUMN;
