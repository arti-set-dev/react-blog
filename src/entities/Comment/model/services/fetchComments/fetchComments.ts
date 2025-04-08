import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '../../../model/types/comments';

export const fetchComments = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchComments', async (articleId, thunkAPI) => {
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
});
