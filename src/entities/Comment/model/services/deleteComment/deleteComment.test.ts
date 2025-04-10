import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { deleteComment } from './deleteComment';

describe('deleteComment', () => {
  const mockCommentId = '1';

  test('success delete comment', async () => {
    const thunk = new TestAsyncThunk(deleteComment);
    thunk.api.delete.mockReturnValue(Promise.resolve({}));

    const result = await thunk.callThunk(mockCommentId);

    expect(thunk.api.delete).toHaveBeenCalled();
    expect(thunk.api.delete).toHaveBeenCalledWith(`/comments/${mockCommentId}`);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toBe(mockCommentId);
  });

  test('error delete comment', async () => {
    const thunk = new TestAsyncThunk(deleteComment);
    thunk.api.delete.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk(mockCommentId);

    expect(thunk.api.delete).toHaveBeenCalled();
    expect(thunk.api.delete).toHaveBeenCalledWith(`/comments/${mockCommentId}`);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error delete comment - empty commentId', async () => {
    const thunk = new TestAsyncThunk(deleteComment);
    thunk.api.delete.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk('');

    expect(thunk.api.delete).toHaveBeenCalled();
    expect(thunk.api.delete).toHaveBeenCalledWith('/comments/');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
