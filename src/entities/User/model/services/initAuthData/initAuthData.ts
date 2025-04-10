import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../types/user';

export const initAuthData = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>('user/initAuthData', async (_, thunkAPI) => {
  const { rejectWithValue, extra } = thunkAPI;

  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!token) {
    return rejectWithValue('Missing token');
  }

  try {
    const payload: { id?: string } = jwtDecode(token);

    if (!payload.id) {
      return rejectWithValue('Invalid token payload');
    }

    const response = await extra.api.get<User>(`/users/${payload.id}`);

    if (!response.data.jsonSettings) {
      return rejectWithValue('Error while saving json settings');
    }

    return response.data;
  } catch (error) {
    console.error('Error in initAuthData:', error);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    return rejectWithValue('Error while decoding token');
  }
});
