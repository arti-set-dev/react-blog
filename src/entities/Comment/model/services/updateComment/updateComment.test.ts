import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateComment } from './updateComment';
import { Comment } from '../../../model/types/comments';

describe('updateComment', () => {
  const mockCommentId = '1';
  const mockText = 'Updated comment text';
  const mockComment: Comment = {
    id: mockCommentId,
    text: mockText,
    user: {
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
    },
  };

  test('success update comment', async () => {
    const thunk = new TestAsyncThunk(updateComment);
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: mockComment }));

    const result = await thunk.callThunk({ commentId: mockCommentId, text: mockText });

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith(`/comments/${mockCommentId}`, {
      text: mockText,
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockComment);
  });

  test('error update comment - api error', async () => {
    const thunk = new TestAsyncThunk(updateComment);
    thunk.api.patch.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk({ commentId: mockCommentId, text: mockText });

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith(`/comments/${mockCommentId}`, {
      text: mockText,
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update comment - no response data', async () => {
    const thunk = new TestAsyncThunk(updateComment);
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: undefined }));

    const result = await thunk.callThunk({ commentId: mockCommentId, text: mockText });

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith(`/comments/${mockCommentId}`, {
      text: mockText,
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update comment - empty commentId', async () => {
    const thunk = new TestAsyncThunk(updateComment);
    thunk.api.patch.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk({ commentId: '', text: mockText });

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith('/comments/', {
      text: mockText,
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update comment - empty text', async () => {
    const thunk = new TestAsyncThunk(updateComment);
    thunk.api.patch.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk({ commentId: mockCommentId, text: '' });

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith(`/comments/${mockCommentId}`, {
      text: '',
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
