import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        getArticleRating: {
          useQuery: jest.fn().mockReturnValue({}),
        },
        rareArticle: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
      },
    }),
  },
}));

describe('articleRatingApi', () => {
  it('should inject endpoints correctly', () => {
    const { getArticleRating, rareArticle } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getArticleRating: build.query<Rating[], { userId: number; articleId: number }>({
          query: ({ articleId, userId }) => ({
            url: '/articleRatings',
            params: {
              articleId,
              userId,
            },
          }),
        }),
        rareArticle: build.mutation<void, { userId: number; articleId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/articleRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints;

    expect(getArticleRating).toBeDefined();
    expect(rareArticle).toBeDefined();
  });

  it('should call getArticleRating query with correct parameters', () => {
    const { getArticleRating } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getArticleRating: build.query<Rating[], { userId: number; articleId: number }>({
          query: ({ articleId, userId }) => ({
            url: '/articleRatings',
            params: {
              articleId,
              userId,
            },
          }),
        }),
      }),
    }).endpoints;

    getArticleRating.useQuery({ userId: 1, articleId: 1 });

    expect(getArticleRating.useQuery).toHaveBeenCalledWith({ userId: 1, articleId: 1 });
  });

  it('should call rareArticle mutation with correct parameters', () => {
    const [rateArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        rareArticle: build.mutation<void, { userId: number; articleId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/articleRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints.rareArticle.useMutation();

    const ratingData = {
      userId: 1,
      articleId: 1,
      rate: 4,
      feedback: 'Отличная статья!',
    };

    rateArticle(ratingData);

    expect(rateArticle).toHaveBeenCalledWith(ratingData);
  });

  it('should handle error when rating article fails', () => {
    const error = { status: 500, data: { message: 'Server error' } };
    const [rateArticle] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        rareArticle: build.mutation<void, { userId: number; articleId: number; rate: number; feedback?: string }>({
          query: (arg) => ({
            url: '/articleRatings',
            method: 'post',
            body: arg,
          }),
        }),
      }),
    }).endpoints.rareArticle.useMutation();

    (rateArticle as jest.Mock).mockRejectedValue(error);

    const ratingData = {
      userId: 1,
      articleId: 1,
      rate: 4,
    };

    return expect(rateArticle(ratingData)).rejects.toEqual(error);
  });
});
