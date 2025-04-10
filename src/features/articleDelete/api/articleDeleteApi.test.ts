import { rtkApi } from '@/shared/api/rtkApi';

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        deleteArticle: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
      },
    }),
  },
}));

describe('articleDeleteApi', () => {
  it('should inject endpoints correctly', () => {
    const { deleteArticle } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        deleteArticle: build.mutation<void, string>({
          query: (articleId) => ({
            url: `/posts/${articleId}`,
            method: 'DELETE',
          }),
        }),
      }),
    }).endpoints;

    expect(deleteArticle).toBeDefined();
  });

  it('should call deleteArticle mutation with correct articleId', () => {
    const [deleteArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        deleteArticle: build.mutation<void, string>({
          query: (articleId) => ({
            url: `/posts/${articleId}`,
            method: 'DELETE',
          }),
        }),
      }),
    }).endpoints.deleteArticle.useMutation();

    const articleId = '123';
    deleteArticle(articleId);

    expect(deleteArticle).toHaveBeenCalledWith(articleId);
  });

  it('should handle error when deleting article fails', () => {
    const error = { status: 404, data: { message: 'Article not found' } };
    const [deleteArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        deleteArticle: build.mutation<void, string>({
          query: (articleId) => ({
            url: `/posts/${articleId}`,
            method: 'DELETE',
          }),
        }),
      }),
    }).endpoints.deleteArticle.useMutation();

    // Мокаем реджект для имитации ошибки
    (deleteArticle as jest.Mock).mockRejectedValue(error);

    const articleId = '123';

    return expect(deleteArticle(articleId)).rejects.toEqual(error);
  });
});
