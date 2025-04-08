import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../types/user';
import { getUserDataByIdQuery } from '../../../api/userApi';

export const initAuthData = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>('user/initAuthData', async (_, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!token) {
    return rejectWithValue('Missing token');
  }

  try {
    const payload: { id?: string } = jwtDecode(token);

    if (!payload.id) {
      return rejectWithValue('Invalid token payload');
    }

    const response = await dispatch(getUserDataByIdQuery(payload.id)).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('Error while saving json settings');
    }

    return response;
  } catch (error) {
    console.error('Error in initAuthData:', error);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    return rejectWithValue('Error while decoding token');
  }
});
