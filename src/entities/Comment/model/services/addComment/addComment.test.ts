import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { addComment } from './addComment';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchComments } from '../fetchComments/fetchComments';

jest.mock('@/entities/User', () => ({
  getUserAuthData: jest.fn(),
}));

jest.mock('@/entities/Article', () => ({
  getArticleDetailsData: jest.fn(),
}));

jest.mock('../fetchComments/fetchComments', () => ({
  fetchComments: jest.fn(),
}));

describe('addComment', () => {
  const mockUser = {
    id: '1',
    username: 'testuser',
  };

  const mockArticle = {
    id: '1',
    title: 'Test Article',
  };

  const mockComment = {
    id: '1',
    text: 'Test comment',
    articleId: '1',
    userId: '1',
  };

  beforeEach(() => {
    (getUserAuthData as jest.Mock).mockReturnValue(mockUser);
    (getArticleDetailsData as jest.Mock).mockReturnValue(mockArticle);
  });

  test('success add comment', async () => {
    const thunk = new TestAsyncThunk(addComment);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: mockComment }));

    const result = await thunk.callThunk('Test comment');

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.api.post).toHaveBeenCalledWith('comments', {
      articleId: mockArticle.id,
      userId: mockUser.id,
      text: 'Test comment',
    });
    expect(fetchComments).toHaveBeenCalledWith(mockArticle.id);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockComment);
  });

  test('error add comment - no user data', async () => {
    (getUserAuthData as jest.Mock).mockReturnValue(undefined);

    const thunk = new TestAsyncThunk(addComment);
    const result = await thunk.callThunk('Test comment');

    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(fetchComments).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('no data');
  });

  test('error add comment - no article data', async () => {
    (getArticleDetailsData as jest.Mock).mockReturnValue(undefined);

    const thunk = new TestAsyncThunk(addComment);
    const result = await thunk.callThunk('Test comment');

    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(fetchComments).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('no data');
  });

  test('error add comment - empty text', async () => {
    const thunk = new TestAsyncThunk(addComment);
    const result = await thunk.callThunk('');

    expect(thunk.api.post).not.toHaveBeenCalled();
    expect(fetchComments).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('no data');
  });

  test('error add comment - api error', async () => {
    const thunk = new TestAsyncThunk(addComment);
    thunk.api.post.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk('Test comment');

    expect(thunk.api.post).toHaveBeenCalled();
    expect(fetchComments).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error add comment - no response data', async () => {
    const thunk = new TestAsyncThunk(addComment);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: undefined }));

    const result = await thunk.callThunk('Test comment');

    expect(thunk.api.post).toHaveBeenCalled();
    expect(fetchComments).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
