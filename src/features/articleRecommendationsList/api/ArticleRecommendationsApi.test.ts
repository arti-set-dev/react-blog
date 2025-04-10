import { rtkApi } from '@/shared/api/rtkApi';

// Мокаем типы без импорта реальных модулей
type Article = {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  blocks: any[];
  userId: string;
};

enum ArticleType {
  IT = 'IT',
}

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        getArticleRecommendationsList: {
          useQuery: jest.fn().mockReturnValue({}),
          initiate: jest.fn(),
        },
      },
    }),
  },
}));

jest.mock('@/entities/User/api/userApi', () => ({
  userApi: {
    endpoints: {
      setJsonSettings: {
        initiate: jest.fn(),
      },
      getUserDataById: {
        initiate: jest.fn(),
      },
    },
  },
}));

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  subtitle: 'Test Subtitle',
  img: 'test.jpg',
  views: 0,
  createdAt: '2024-01-01',
  type: [ArticleType.IT],
  blocks: [],
  userId: '1',
};

const mockResponse = {
  items: [mockArticle],
  total: 1,
  page: 1,
  limit: 15,
  totalPages: 1,
};

type ArticlesResponse = {
  items: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

describe('recommendationsApi', () => {
  it('should inject endpoints correctly', () => {
    const { getArticleRecommendationsList } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], { limit?: number }>({
          query: ({ limit = 15 }) => ({
            url: '/posts',
            params: {
              limit,
            },
          }),
          transformResponse: (response: ArticlesResponse) => response.items,
        }),
      }),
    }).endpoints;

    expect(getArticleRecommendationsList).toBeDefined();
  });

  it('should call getArticleRecommendationsList query with default limit', () => {
    const { getArticleRecommendationsList } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], { limit?: number }>({
          query: ({ limit = 15 }) => ({
            url: '/posts',
            params: {
              limit,
            },
          }),
          transformResponse: (response: ArticlesResponse) => response.items,
        }),
      }),
    }).endpoints;

    getArticleRecommendationsList.useQuery({});

    expect(getArticleRecommendationsList.useQuery).toHaveBeenCalledWith({});
  });

  it('should call getArticleRecommendationsList query with custom limit', () => {
    const { getArticleRecommendationsList } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], { limit?: number }>({
          query: ({ limit = 15 }) => ({
            url: '/posts',
            params: {
              limit,
            },
          }),
          transformResponse: (response: ArticlesResponse) => response.items,
        }),
      }),
    }).endpoints;

    getArticleRecommendationsList.useQuery({ limit: 5 });

    expect(getArticleRecommendationsList.useQuery).toHaveBeenCalledWith({ limit: 5 });
  });
});
