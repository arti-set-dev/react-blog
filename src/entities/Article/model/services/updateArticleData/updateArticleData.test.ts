import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article } from '../../types/article';
import { ArticleType } from '../../types/articleType';
import { updateArticleData } from './updateArticleData';
import { getArticleDetailsForm } from '../../selectors/articleDetails/articleDetails';

jest.mock('../../selectors/articleDetails/articleDetails');

describe('updateArticleData', () => {
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

  const mockFormData = new FormData();
  mockFormData.append('title', 'Updated Title');
  mockFormData.append('subtitle', 'Updated Subtitle');

  beforeEach(() => {
    (getArticleDetailsForm as jest.Mock).mockReturnValue(mockArticle);
  });

  test('success update article', async () => {
    const thunk = new TestAsyncThunk(updateArticleData);
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: mockArticle }));

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(thunk.api.patch).toHaveBeenCalledWith(`/posts/${mockArticle.id}`, mockFormData);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockArticle);
  });

  test('error update article - no article id', async () => {
    (getArticleDetailsForm as jest.Mock).mockReturnValue({ ...mockArticle, id: undefined });
    const thunk = new TestAsyncThunk(updateArticleData);

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.patch).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Failed to update article');
  });

  test('error update article - api error', async () => {
    const thunk = new TestAsyncThunk(updateArticleData);
    thunk.api.patch.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Failed to update article');
  });

  test('error update article - no data in response', async () => {
    const thunk = new TestAsyncThunk(updateArticleData);
    thunk.api.patch.mockReturnValue(Promise.resolve({ data: undefined }));

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Failed to update article');
  });
});
