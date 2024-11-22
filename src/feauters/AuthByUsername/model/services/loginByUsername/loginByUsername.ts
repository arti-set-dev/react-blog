import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ThunkExtraArg } from 'app/providers/StoreProvider/config/StateSchema';
import axios, { AxiosResponse } from 'axios';
import { User, userActions } from 'entitie/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const
  loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI;

      try {
        const response = await extra.api.post<User>('/login', authData);

        if (!response.data) {
          throw new Error();
        }

        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
        dispatch(userActions.setAuthData(response.data));

        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue('error');
      }
    },
  );
