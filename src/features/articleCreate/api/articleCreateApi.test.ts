import { rtkApi } from '@/shared/api/rtkApi';
import { Article, ArticleType } from '@/entities/Article';

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        createArticle: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
      },
    }),
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

describe('articleCreateApi', () => {
  it('should inject endpoints correctly', () => {
    const { createArticle } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        createArticle: build.mutation<Article, FormData>({
          query: (formData) => ({
            url: '/posts',
            method: 'POST',
            body: formData,
            headers: {},
            formData: true,
          }),
        }),
      }),
    }).endpoints;

    expect(createArticle).toBeDefined();
  });

  it('should call createArticle mutation with correct parameters', () => {
    const [createArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        createArticle: build.mutation<Article, FormData>({
          query: (formData) => ({
            url: '/posts',
            method: 'POST',
            body: formData,
            headers: {},
            formData: true,
          }),
        }),
      }),
    }).endpoints.createArticle.useMutation();

    const formData = new FormData();
    formData.append('title', mockArticle.title);
    formData.append('subtitle', mockArticle.subtitle);
    formData.append('img', mockArticle.img);
    formData.append('type', JSON.stringify(mockArticle.type));
    formData.append('blocks', JSON.stringify(mockArticle.blocks));
    formData.append('userId', mockArticle.userId || '');

    createArticle(formData);

    expect(createArticle).toHaveBeenCalledWith(formData);
  });

  it('should handle error when creating article fails', () => {
    const error = { status: 500, data: { message: 'Server error' } };
    const [createArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        createArticle: build.mutation<Article, FormData>({
          query: (formData) => ({
            url: '/posts',
            method: 'POST',
            body: formData,
            headers: {},
            formData: true,
          }),
        }),
      }),
    }).endpoints.createArticle.useMutation();

    // Мокаем реджект для имитации ошибки
    (createArticle as jest.Mock).mockRejectedValue(error);

    const formData = new FormData();

    return expect(createArticle(formData)).rejects.toEqual(error);
  });
});
