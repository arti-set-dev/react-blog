import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleViewSwitcherSchema } from '../types/ArticleViewSwitcherSchema';

const initialState: ArticleViewSwitcherSchema = {};

export const ArticleViewSwitcherSlice = createSlice({
  name: 'ArticleViewSwitcher',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {},
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { actions: ArticleViewSwitcherActions } = ArticleViewSwitcherSlice;
export const { reducer: ArticleViewSwitcherReducer } = ArticleViewSwitcherSlice;
