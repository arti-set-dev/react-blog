import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('common/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post<AuthResponse>('/auth/login', {
      username: authData.username,
      password: authData.password,
    });

    if (!response.data) {
      throw new Error();
    }

    const { user, accessToken } = response.data;

    dispatch(userActions.setAuthData(user));

    localStorage.setItem(USER_LOCALSTORAGE_KEY, accessToken);

    return user;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Authentication error');
  }
});
