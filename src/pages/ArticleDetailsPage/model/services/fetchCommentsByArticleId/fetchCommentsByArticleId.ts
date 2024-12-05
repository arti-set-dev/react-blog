import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios, { AxiosResponse } from 'axios';
import { Comment } from 'entitie/Comment';
import { User, userActions } from 'entitie/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[], string | undefined, ThunkConfig<string>>(
      'articleDetails/fetchCommentsByArticleId',
      async (articleId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        if (!articleId) {
          return rejectWithValue('error');
        }

        try {
          const response = await extra.api.get<Comment[]>('/comments', {
            params: {
              articleId,
              _expand: 'user',
            },
          });

          if (!response.data) {
            throw new Error();
          }

          return response.data;
        } catch (error) {
          return rejectWithValue('error');
        }
      },
    );
