import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '../../..';

export const updateComment = createAsyncThunk<
  Comment,
  { commentId: string; text: string },
  ThunkConfig<string>
>('articleDetails/updateComment', async ({ commentId, text }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.patch<Comment>(`/comments/${commentId}`, {
      text,
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
