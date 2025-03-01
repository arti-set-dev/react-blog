import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  articleListActions,
  fetchArticlesList,
  getArticlesListIsHasMore,
  getArticlesListIsLoading,
  getArticlesListNum,
} from '@/entities/Article';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('fetchNextArticlesPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const hasMore = getArticlesListIsHasMore(getState());
  const page = getArticlesListNum(getState());
  const isLoading = getArticlesListIsLoading(getState());

  if (hasMore && !isLoading && page >= 1) {
    dispatch(fetchArticlesList({}));
    dispatch(articleListActions.setPage(page + 1));
  }
});
