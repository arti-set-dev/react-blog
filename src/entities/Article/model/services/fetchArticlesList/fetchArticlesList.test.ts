import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article } from '../../types/article';
import { ArticleType, ArticleSortField } from '../../types/articleType';
import { fetchArticlesList } from './fetchArticlesList';
import {
  getArticlesListLimit,
  getArticlesListNum,
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListType,
} from '../../selectors/articleList/articleList';

jest.mock('../../selectors/articleList/articleList');

describe('fetchArticlesList', () => {
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'Test Article 1',
      subtitle: 'Test Subtitle 1',
      img: 'test1.jpg',
      views: 100,
      createdAt: '2024-01-01',
      type: [ArticleType.IT],
      blocks: [],
      userId: '1',
      author: {
        id: '1',
        username: 'testuser1',
        email: 'test1@test.com',
      },
    },
    {
      id: '2',
      title: 'Test Article 2',
      subtitle: 'Test Subtitle 2',
      img: 'test2.jpg',
      views: 200,
      createdAt: '2024-01-02',
      type: [ArticleType.SCIENCE],
      blocks: [],
      userId: '2',
      author: {
        id: '2',
        username: 'testuser2',
        email: 'test2@test.com',
      },
    },
  ];

  beforeEach(() => {
    (getArticlesListLimit as jest.Mock).mockReturnValue(9);
    (getArticlesListNum as jest.Mock).mockReturnValue(1);
    (getArticlesListOrder as jest.Mock).mockReturnValue('asc');
    (getArticlesListSearch as jest.Mock).mockReturnValue('');
    (getArticlesListSort as jest.Mock).mockReturnValue(ArticleSortField.CREATED);
    (getArticlesListType as jest.Mock).mockReturnValue(ArticleType.ALL);
  });

  test('success fetch articles list', async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);
    thunk.api.get.mockReturnValue(Promise.resolve({
      data: {
        items: mockArticles,
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    }));

    const result = await thunk.callThunk({});

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/posts', {
      params: {
        limit: 9,
        page: 1,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
      },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockArticles);
  });

  test('success fetch articles list with type filter', async () => {
    (getArticlesListType as jest.Mock).mockReturnValue(ArticleType.IT);
    const thunk = new TestAsyncThunk(fetchArticlesList);
    thunk.api.get.mockReturnValue(Promise.resolve({
      data: {
        items: mockArticles,
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    }));

    const result = await thunk.callThunk({});

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/posts', {
      params: {
        limit: 9,
        page: 1,
        sort: ArticleSortField.CREATED,
        order: 'asc',
        search: '',
      },
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual([mockArticles[0]]);
  });

  test('error fetch articles list', async () => {
    const thunk = new TestAsyncThunk(fetchArticlesList);
    thunk.api.get.mockReturnValue(Promise.reject(new Error()));

    const result = await thunk.callThunk({});

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
