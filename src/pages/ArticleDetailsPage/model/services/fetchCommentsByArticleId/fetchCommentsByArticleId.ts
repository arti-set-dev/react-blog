import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[], string | undefined, ThunkConfig<string>>(
      'articleDetails/fetchCommentsByArticleId',
      async (articleId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
          const response = await extra.api.get<Comment[]>('/comments', {
            params: {
              articleId,
              _expand: 'user',
            },
          });

          if (!articleId) {
            return rejectWithValue('error');
          }

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (error) {
          return rejectWithValue('error');
        }
      },
    );
