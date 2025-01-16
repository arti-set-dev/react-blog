import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSortSelectorSchema } from '../types/ArticleSortSelectorSchema';

const initialState: ArticleSortSelectorSchema = {

};

export const ArticleSortSelectorSlice = createSlice({
  name: 'ArticleSortSelector',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
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

export const { actions: ArticleSortSelectorActions } = ArticleSortSelectorSlice;
export const { reducer: ArticleSortSelectorReducer } = ArticleSortSelectorSlice;
