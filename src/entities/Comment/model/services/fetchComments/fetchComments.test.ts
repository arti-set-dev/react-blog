import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchComments } from './fetchComments';
import { Comment } from '../../../model/types/comments';

describe('fetchComments', () => {
  const mockArticleId = '1';
  const mockComments: Comment[] = [
    {
      id: '1',
      text: 'Test comment 1',
      user: {
        id: '1',
        username: 'testuser',
        email: 'testuser@example.com',
      },
    },
    {
      id: '2',
      text: 'Test comment 2',
      user: {
        id: '2',
        username: 'testuser2',
        email: 'testuser2@example.com',
      },
    },
  ];

  test('success fetch comments', async () => {
    const thunk = new TestAsyncThunk(fetchComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockComments }));

    const result = await thunk.callThunk(mockArticleId);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
      params: {
        articleId: mockArticleId,
        _expand: 'user',
      },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockComments);
  });

  test('error fetch comments - no articleId', async () => {
    const thunk = new TestAsyncThunk(fetchComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockComments }));

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
      params: {
        articleId: undefined,
        _expand: 'user',
      },
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error fetch comments - api error', async () => {
    const thunk = new TestAsyncThunk(fetchComments);
    thunk.api.get.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk(mockArticleId);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
      params: {
        articleId: mockArticleId,
        _expand: 'user',
      },
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error fetch comments - no response data', async () => {
    const thunk = new TestAsyncThunk(fetchComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }));

    const result = await thunk.callThunk(mockArticleId);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
      params: {
        articleId: mockArticleId,
        _expand: 'user',
      },
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
