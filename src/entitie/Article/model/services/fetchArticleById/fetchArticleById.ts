import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios, { AxiosResponse } from 'axios';
import { User, userActions } from 'entitie/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article, string, ThunkConfig<string>>(
      'article/fetchArticleById',
      async (articleId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
          const response = await extra.api.get<Article>(`/articles/${articleId}`);

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (error) {
          console.log(error);
          return rejectWithValue('error');
        }
      },
    );
