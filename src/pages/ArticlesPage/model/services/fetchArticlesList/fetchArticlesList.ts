import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
  getArticlesPageIsLimit,
  getArticlesPageIsOrder,
  getArticlesPageIsSearch,
  getArticlesPageIsSort,
  getArticlesPageIsNum,
  getArticlesPageIsType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkAPI) => {
  const {
    extra, dispatch, rejectWithValue, getState,
  } = thunkAPI;
  const limit = getArticlesPageIsLimit(getState());
  const sort = getArticlesPageIsSort(getState());
  const order = getArticlesPageIsOrder(getState());
  const search = getArticlesPageIsSearch(getState());
  const page = getArticlesPageIsNum(getState());
  const type = getArticlesPageIsType(getState());

  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    });
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
