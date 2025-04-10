import { fetchComments } from '../services/fetchComments/fetchComments';
import { updateComment } from '../services/updateComment/updateComment';
import { ValidateCommentError } from '../const/const';
import { Comment, CommentsSchema } from '../types/comments';
import { commentsActions, commentsReducer } from './commentsSlice';

const mockComments: Comment[] = [
  {
    id: '1',
    text: 'Тестовый комментарий 1',
    user: {
      id: '1',
      username: 'user1',
      avatar: 'https://example.com/avatar1.jpg',
      email: 'user1@test.com',
    },
  },
  {
    id: '2',
    text: 'Тестовый комментарий 2',
    user: {
      id: '2',
      username: 'user2',
      avatar: 'https://example.com/avatar2.jpg',
      email: 'user2@test.com',
    },
  },
];

describe('commentsSlice', () => {
  test('updateComment action', () => {
    const state: DeepPartial<CommentsSchema> = {
      entities: {
        1: {
          id: '1',
          text: 'Старый текст',
          user: {
            id: '1',
            username: 'user1',
            avatar: 'https://example.com/avatar1.jpg',
            email: 'user1@test.com',
          },
        },
      },
      ids: ['1'],
    };

    const updatedComment: Comment = {
      id: '1',
      text: 'Обновленный текст',
      user: {
        id: '1',
        username: 'user1',
        avatar: 'https://example.com/avatar1.jpg',
        email: 'user1@test.com',
      },
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        commentsActions.updateComment(updatedComment),
      ),
    ).toEqual({
      entities: {
        1: updatedComment,
      },
      ids: ['1'],
    });
  });

  test('fetchComments.pending', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        fetchComments.pending('', undefined),
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('fetchComments.fulfilled', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: true,
      ids: [],
      entities: {},
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        fetchComments.fulfilled(mockComments, '', undefined),
      ),
    ).toEqual({
      isLoading: false,
      ids: ['1', '2'],
      entities: {
        1: mockComments[0],
        2: mockComments[1],
      },
    });
  });

  test('fetchComments.rejected', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: true,
      error: undefined,
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        fetchComments.rejected(new Error(), '', undefined, 'error'),
      ),
    ).toEqual({
      isLoading: false,
      error: 'error',
    });
  });

  test('updateComment.pending', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: false,
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        updateComment.pending('', { commentId: '1', text: 'text' }),
      ),
    ).toEqual({
      isLoading: true,
    });
  });

  test('updateComment.fulfilled', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: true,
      validateErrors: [
        { id: '1', errors: [ValidateCommentError.NO_DATA] },
      ],
      entities: {},
      ids: [],
    };

    const updatedComment: Comment = {
      id: '1',
      text: 'Обновленный текст',
      user: {
        id: '1',
        username: 'user1',
        avatar: 'https://example.com/avatar1.jpg',
        email: 'user1@test.com',
      },
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        updateComment.fulfilled(updatedComment, '', { commentId: '1', text: 'text' }),
      ),
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      entities: {
        1: updatedComment,
      },
      ids: ['1'],
    });
  });

  test('updateComment.rejected', () => {
    const state: DeepPartial<CommentsSchema> = {
      isLoading: true,
    };

    expect(
      commentsReducer(
        state as CommentsSchema,
        updateComment.rejected(new Error(), '', { commentId: '1', text: 'text' }),
      ),
    ).toEqual({
      isLoading: false,
    });
  });
});
