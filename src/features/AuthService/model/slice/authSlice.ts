import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { AuthSchema } from '../types/authSchema';
import { registration } from '../services/registration/registration';

const initialState: AuthSchema = {
  isLoading: false,
  email: '',
  password: '',
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginByUsername.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(loginByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(loginByUsername.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    // registration
    builder.addCase(registration.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;

export default authSlice.reducer;
