/* eslint-disable max-len */
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { updateCommentForArticle } from '../services/updateCommentForArticle/updateCommentForArticle';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {
    updateComment: (state, action: PayloadAction<Comment>) => {
      commentsAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // fetch comments
    builder.addCase(fetchCommentsByArticleId.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(
      fetchCommentsByArticleId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      },
    );
    // update comment
    builder.addCase(updateCommentForArticle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCommentForArticle.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateCommentForArticle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validateErrors = undefined;
      commentsAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  reducer: articleDetailsCommentsReducer,
  actions: articleDetailsCommentsActions,
} = articleDetailsCommentsSlice;
