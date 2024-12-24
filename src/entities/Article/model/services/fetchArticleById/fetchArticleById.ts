import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article, string | undefined, ThunkConfig<string>>(
      'article/fetchArticleById',
      async (articleId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
          const response = await extra.api.get<Article>(`/articles/${articleId}`, {
            params: {
              _expand: 'user',
            },
          });

          if (!articleId) {
            throw new Error('Article not found');
          }

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
