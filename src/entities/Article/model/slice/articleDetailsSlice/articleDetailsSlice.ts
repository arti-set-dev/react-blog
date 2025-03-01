import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../../services/fetchArticleById/fetchArticleById';
import { Article } from '../../types/article';
import { ArticleDetailsSchema } from '../../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch profile
    builder.addCase(fetchArticleById.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(
      fetchArticleById.fulfilled,
      (state, action: PayloadAction<Article>) => {
        state.isLoading = false;
        state.data = action.payload;
      },
    );
  },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;

export default articleDetailsSlice.reducer;
