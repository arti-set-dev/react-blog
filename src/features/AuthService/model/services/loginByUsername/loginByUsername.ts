import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('common/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post<AuthResponse>('/login', {
      username: authData.username,
      password: authData.password,
    });

    if (!response.data) {
      throw new Error();
    }

    const { user, accessToken, refreshToken } = response.data;
    dispatch(userActions.setAuthData(user));

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Ошибка аутентификации');
  }
});
