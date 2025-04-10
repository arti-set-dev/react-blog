import { ArticleView } from '../../consts/consts';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';
import { Article } from '../../types/article';
import { ArticleSortField, ArticleType } from '../../types/articleType';
import { ArticleListSchema } from '../../types/articleListSchema';
import { articleListActions, articleListReducer } from './articleListSlice';

const articles: Article[] = [
  {
    id: '1',
    title: 'Тестовая статья 1',
    subtitle: 'Подзаголовок статьи 1',
    img: 'https://example.com/image1.jpg',
    views: 100,
    createdAt: '2023-01-01',
    author: {
      id: '1',
      username: 'admin',
      avatar: 'https://example.com/avatar.jpg',
      email: 'admin@test.com',
    },
    type: [ArticleType.IT],
    blocks: [],
  },
  {
    id: '2',
    title: 'Тестовая статья 2',
    subtitle: 'Подзаголовок статьи 2',
    img: 'https://example.com/image2.jpg',
    views: 200,
    createdAt: '2023-01-02',
    author: {
      id: '1',
      username: 'admin',
      avatar: 'https://example.com/avatar.jpg',
      email: 'admin@test.com',
    },
    type: [ArticleType.SCIENCE],
    blocks: [],
  },
];

describe('articleListSlice', () => {
  test('setView', () => {
    const state: DeepPartial<ArticleListSchema> = {
      view: ArticleView.GRID,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setView(ArticleView.COLUMN),
      ),
    ).toEqual({ view: ArticleView.COLUMN });
  });

  test('setPage', () => {
    const state: DeepPartial<ArticleListSchema> = {
      page: 1,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setPage(2),
      ),
    ).toEqual({ page: 2 });
  });

  test('setOrder', () => {
    const state: DeepPartial<ArticleListSchema> = {
      order: 'asc',
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setOrder('desc'),
      ),
    ).toEqual({ order: 'desc' });
  });

  test('setSort', () => {
    const state: DeepPartial<ArticleListSchema> = {
      sort: ArticleSortField.CREATED,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setSort(ArticleSortField.VIEWS),
      ),
    ).toEqual({ sort: ArticleSortField.VIEWS });
  });

  test('setSearch', () => {
    const state: DeepPartial<ArticleListSchema> = {
      search: '',
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setSearch('тест'),
      ),
    ).toEqual({ search: 'тест' });
  });

  test('setType', () => {
    const state: DeepPartial<ArticleListSchema> = {
      types: ArticleType.ALL,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.setType(ArticleType.IT),
      ),
    ).toEqual({ types: ArticleType.IT });
  });

  test('initState с localStorage', () => {
    const state: DeepPartial<ArticleListSchema> = {
      _inited: false,
    };

    // Мокаем localStorage
    Storage.prototype.getItem = jest.fn(() => ArticleView.COLUMN);

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.initState(),
      ),
    ).toEqual({
      _inited: true,
      view: ArticleView.COLUMN,
      limit: 4,
    });
  });

  test('removeArticle', () => {
    const state: DeepPartial<ArticleListSchema> = {
      ids: ['1', '2'],
      entities: {
        1: { id: '1' } as Article,
        2: { id: '2' } as Article,
      },
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.removeArticle('1'),
      ),
    ).toEqual({
      ids: ['2'],
      entities: {
        2: { id: '2' } as Article,
      },
    });
  });

  test('addArticle', () => {
    const state: DeepPartial<ArticleListSchema> = {
      ids: ['1'],
      entities: {
        1: { id: '1' } as Article,
      },
    };

    const newArticle = { id: '2' } as Article;

    expect(
      articleListReducer(
        state as ArticleListSchema,
        articleListActions.addArticle(newArticle),
      ),
    ).toEqual({
      ids: ['1', '2'],
      entities: {
        1: { id: '1' } as Article,
        2: { id: '2' } as Article,
      },
    });
  });

  test('fetchArticlesList.pending с replace=true', () => {
    const state: DeepPartial<ArticleListSchema> = {
      isLoading: false,
      error: 'error',
      ids: ['1'],
      entities: {
        1: { id: '1' } as Article,
      },
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        fetchArticlesList.pending('', { replace: true }, undefined),
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
      ids: [],
      entities: {},
    });
  });

  test('fetchArticlesList.pending без replace', () => {
    const state: DeepPartial<ArticleListSchema> = {
      isLoading: false,
      error: 'error',
      ids: ['1'],
      entities: {
        1: { id: '1' } as Article,
      },
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        fetchArticlesList.pending('', {}, undefined),
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
      ids: ['1'],
      entities: {
        1: { id: '1' } as Article,
      },
    });
  });

  test('fetchArticlesList.fulfilled с replace=true', () => {
    const state: DeepPartial<ArticleListSchema> = {
      isLoading: true,
      ids: ['1'],
      entities: {
        1: { id: '1' } as Article,
      },
      limit: 2,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        fetchArticlesList.fulfilled(articles, '', { replace: true }),
      ),
    ).toEqual({
      isLoading: false,
      ids: ['1', '2'],
      entities: {
        1: articles[0],
        2: articles[1],
      },
      limit: 2,
      hasMore: true,
    });
  });

  test('fetchArticlesList.fulfilled без replace', () => {
    const state: DeepPartial<ArticleListSchema> = {
      isLoading: true,
      ids: [],
      entities: {},
      limit: 2,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        fetchArticlesList.fulfilled(articles, '', {}),
      ),
    ).toEqual({
      isLoading: false,
      ids: ['1', '2'],
      entities: {
        1: articles[0],
        2: articles[1],
      },
      limit: 2,
      hasMore: true,
    });
  });

  test('fetchArticlesList.rejected', () => {
    const state: DeepPartial<ArticleListSchema> = {
      isLoading: true,
      error: undefined,
    };

    expect(
      articleListReducer(
        state as ArticleListSchema,
        fetchArticlesList.rejected(new Error(), '', {}, 'error'),
      ),
    ).toEqual({
      isLoading: false,
      error: 'error',
    });
  });
});
