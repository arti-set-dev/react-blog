import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, User, userActions } from '@/entities/User';

interface RegistrationProps {
  username: string;
  password: string;
  email: string;
  file?: File;
}

export const registration = createAsyncThunk<
  User,
  RegistrationProps,
  ThunkConfig<string>
>('common/registration', async (regData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const formData = new FormData();
    formData.append('username', regData.username);
    formData.append('password', regData.password);
    formData.append('email', regData.email);

    if (regData.file) {
      formData.append('avatar', regData.file);
    }

    const response = await extra.api.post<AuthResponse>('/auth/registration', formData);

    if (!response.data) {
      throw new Error('Пустой ответ сервера');
    }

    const { user, accessToken } = response.data;
    dispatch(userActions.setAuthData(user));

    localStorage.setItem('token', accessToken);

    return user;
  } catch (error) {
    return rejectWithValue('Registration error');
  }
});
