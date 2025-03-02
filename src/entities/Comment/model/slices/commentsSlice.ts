/* eslint-disable max-len */
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Comment } from '../..';
import { fetchComments } from '../services/fetchComments/fetchComments';
import { updateComment } from '../services/updateComment/updateComment';
import { CommentsSchema } from '../types/comments';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state?.comments ?? commentsAdapter.getInitialState(),
);

const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState: commentsAdapter.getInitialState<CommentsSchema>({
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
    builder.addCase(fetchComments.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      },
    );
    // update comment
    builder.addCase(updateComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.validateErrors = undefined;
      commentsAdapter.upsertOne(state, action.payload);
    });
  },
});

export const {
  reducer: commentsReducer,
  actions: commentsActions,
} = commentsSlice;
