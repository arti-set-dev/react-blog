import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getUserDataByIdQuery } from '../../api/userApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>('user/initAuthData', async (newJsonSettings, thunkAPI) => {
  const {
    rejectWithValue, dispatch,
  } = thunkAPI;

  const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!userId) {
    return rejectWithValue('');
  }

  try {
    const response = await dispatch(
      getUserDataByIdQuery(userId),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('Error while saving json settings');
    }

    return response;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Error while saving json settings');
  }
});
