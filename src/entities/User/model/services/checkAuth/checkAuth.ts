import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { AuthResponse, User } from '../../types/user';
import { userActions } from '../../slice/userSlice';

export const checkAuth = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>('common/checkAuth', async (_, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get<AuthResponse>('/auth/refresh');

    if (!response.data) {
      throw new Error();
    }

    const { user, accessToken } = response.data;

    localStorage.setItem(USER_LOCALSTORAGE_KEY, accessToken);

    dispatch(userActions.setAuthData({ ...user, accessToken }));

    return user;
  } catch (error) {
    console.log(error);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    return rejectWithValue('Authentication error');
  }
});
