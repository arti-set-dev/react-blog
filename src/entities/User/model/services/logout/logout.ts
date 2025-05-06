import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '../../slice/userSlice';

export const logout = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('common/logout', async (_, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    // await extra.api.post('auth/logout');

    dispatch(userActions.logout());

    localStorage.removeItem('token');
  } catch (error) {
    console.error('Exit error:', error);

    dispatch(userActions.logout());
    localStorage.removeItem('token');
  }
});
