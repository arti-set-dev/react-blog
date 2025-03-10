import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../../services/fetchArticleById/fetchArticleById';
import { updateArticleData } from '../../services/updateArticleData/updateArticleData';
import { Article, ArticleEditable } from '../../types/article';
import { ArticleDetailsSchema } from '../../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  form: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    updateArticleField: (state, action: PayloadAction<Partial<ArticleEditable>>) => {
      if (state.form) {
        state.form = {
          ...state.form,
          ...action.payload,
        };
      }
    },
    cancelEdit: (state) => {
      state.form = state.data;
    },
  },
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
        state.form = { ...action.payload };
      },
    );

    // Update article
    builder.addCase(updateArticleData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateArticleData.fulfilled, (state, action: PayloadAction<Article>) => {
      state.isLoading = false;
      state.data = action.payload;
      state.form = action.payload;
    });
    builder.addCase(updateArticleData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;

export default articleDetailsSlice.reducer;
