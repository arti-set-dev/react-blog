import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JsonSettings } from '../types/jsonSettings';
import { setFeatureFlags } from '@/shared/lib/features';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      if (action.payload.isEmailVerified) {
        state.authData = action.payload;
      } else {
        state.authData = undefined;
      }
      state._inited = true;
    },

    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        setFeatureFlags(payload.features);
        state._inited = true;
      },
    );
    builder.addCase(
      initAuthData.rejected,
      (state) => {
        state._inited = !localStorage.getItem(USER_LOCALSTORAGE_KEY);
      },
    );
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
