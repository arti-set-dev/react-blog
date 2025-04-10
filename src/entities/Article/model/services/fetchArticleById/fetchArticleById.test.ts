import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article } from '../../types/article';
import { ArticleType } from '../../types/articleType';
import { fetchArticleById } from './fetchArticleById';

describe('fetchArticleById', () => {
  const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    subtitle: 'Test Subtitle',
    img: 'test.jpg',
    views: 100,
    createdAt: '2024-01-01',
    type: [ArticleType.IT],
    blocks: [],
    userId: '1',
    author: {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
    },
  };

  test('success fetch article', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/posts/1', {
      params: {
        _expand: 'user',
      },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockArticle);
  });

  test('error fetch article', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error with invalid article id', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);

    const result = await thunk.callThunk(undefined);

    expect(thunk.api.get).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Invalid article ID');
  });
});
