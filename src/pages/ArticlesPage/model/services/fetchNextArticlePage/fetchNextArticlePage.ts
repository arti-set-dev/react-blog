import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entitie/Article';
import { getArticleCommentsIsloading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import {
  getArticlesPageIsHasMore,
  getArticlesPageIsLimit, getArticlesPageIsNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlePage',
  async (_, thunkAPI) => {
    const {
      dispatch, getState,
    } = thunkAPI;
    const hasMore = getArticlesPageIsHasMore(getState());
    const page = getArticlesPageIsNum(getState());
    const isLoading = getArticleCommentsIsloading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1));
      dispatch(fetchArticlesList({}));
    }
  },
);
