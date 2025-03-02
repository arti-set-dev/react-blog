import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const deleteComment = createAsyncThunk<
  string,
  string,
  ThunkConfig<string>
>('articleDetails/deleteComment', async (commentId, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    await extra.api.delete(`/comments/${commentId}`);
    return commentId;
  } catch (error) {
    return rejectWithValue('error');
  }
});
