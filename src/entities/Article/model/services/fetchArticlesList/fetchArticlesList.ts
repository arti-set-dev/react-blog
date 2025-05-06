import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { Article } from '../../types/article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  getArticlesListLimit,
  getArticlesListNum,
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListType,
} from '../../selectors/articleList/articleList';
import { ArticleType } from '../../types/articleType';

interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkAPI) => {
  const {
    extra, rejectWithValue, getState,
  } = thunkAPI;
  const limit = getArticlesListLimit(getState());
  const sort = getArticlesListSort(getState());
  const order = getArticlesListOrder(getState());
  const search = getArticlesListSearch(getState());
  const page = getArticlesListNum(getState());
  const type = getArticlesListType(getState());

  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    });

    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    const filteredData = type === ArticleType.ALL
      ? response.data
      : response.data.filter((article) => article.type.includes(type));

    return filteredData;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
