/* eslint-disable max-len */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations
      || recommendationsAdapter.getInitialState(),
);

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendationsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    // fetch comments
    builder.addCase(fetchArticleRecommendations.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
      state.isLoading = false;
      recommendationsAdapter.setAll(state, action.payload);
    });
  },
});

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
