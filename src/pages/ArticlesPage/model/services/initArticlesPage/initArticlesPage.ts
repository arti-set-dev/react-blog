import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entitie/Article';
import { getArticleCommentsIsloading } from 'pages/ArticleDetailsPage/model/selectors/comments';
import { useSelector } from 'react-redux';
import {
  getArticlesPageIsHasMore,
  getArticlesPageIsInited,
  getArticlesPageIsLimit, getArticlesPageIsNum,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const inited = getArticlesPageIsInited(getState());

    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({
        page: 1,
      }));
    }
  },
);
