import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article } from '../../types/article';
import { ArticleType } from '../../types/articleType';
import { updateViewsArticle } from './updateViewsArticle';

describe('updateViewsArticle', () => {
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

  test('success update article views', async () => {
    const thunk = new TestAsyncThunk(updateViewsArticle);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }));
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: { views: 101 } }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/articles/1');
    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith('/articles/1', { views: 101 });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toBe(101);
  });

  test('error update article views - article not found', async () => {
    const thunk = new TestAsyncThunk(updateViewsArticle);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: {} }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.patch).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update article views - empty article data', async () => {
    const thunk = new TestAsyncThunk(updateViewsArticle);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.patch).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update article views - patch error', async () => {
    const thunk = new TestAsyncThunk(updateViewsArticle);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }));
    thunk.api.patch.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });

  test('error update article views - no patch response data', async () => {
    const thunk = new TestAsyncThunk(updateViewsArticle);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }));
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: undefined }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
