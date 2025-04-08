import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

export const authVerify = createAsyncThunk<
  User,
  string,
  ThunkConfig<string>
>('common/authVerify', async (token, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.get<User>(`/auth/verify-email?token=${token}`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Authentication error');
  }
});
