import { fetchNextArticlesPage } from './fetchNextArticlePage';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

const mockGetArticlesListIsHasMore = jest.fn();
const mockGetArticlesListIsLoading = jest.fn();
const mockGetArticlesListNum = jest.fn();

jest.mock('@/entities/Article/model/selectors/articleList/articleList', () => ({
  getArticlesListIsHasMore: (...args: any[]) => mockGetArticlesListIsHasMore(...args),
  getArticlesListIsLoading: (...args: any[]) => mockGetArticlesListIsLoading(...args),
  getArticlesListNum: (...args: any[]) => mockGetArticlesListNum(...args),
}));

describe('fetchNextArticlesPage', () => {
  let testAsyncThunk: TestAsyncThunk<void, void, string>;

  beforeEach(() => {
    testAsyncThunk = new TestAsyncThunk(fetchNextArticlesPage);
    jest.clearAllMocks();
  });

  it('should not fetch articles if hasMore is false', async () => {
    mockGetArticlesListIsHasMore.mockReturnValue(false);
    mockGetArticlesListNum.mockReturnValue(1);
    mockGetArticlesListIsLoading.mockReturnValue(false);

    await testAsyncThunk.callThunk();

    const dispatchCalls = testAsyncThunk.dispatch.mock.calls;
    const hasSetPageCall = dispatchCalls.some((call) => {
      const action = call[0];
      return action
        && typeof action === 'object'
        && 'type' in action
        && typeof action.type === 'string'
        && action.type.includes('setPage');
    });

    expect(hasSetPageCall).toBe(false);
  });

  it('should not fetch articles if isLoading is true', async () => {
    mockGetArticlesListIsHasMore.mockReturnValue(true);
    mockGetArticlesListNum.mockReturnValue(1);
    mockGetArticlesListIsLoading.mockReturnValue(true);

    await testAsyncThunk.callThunk();

    const dispatchCalls = testAsyncThunk.dispatch.mock.calls;
    const hasSetPageCall = dispatchCalls.some((call) => {
      const action = call[0];
      return action
        && typeof action === 'object'
        && 'type' in action
        && typeof action.type === 'string'
        && action.type.includes('setPage');
    });

    expect(hasSetPageCall).toBe(false);
  });

  it('should not fetch articles if page is less than 1', async () => {
    mockGetArticlesListIsHasMore.mockReturnValue(true);
    mockGetArticlesListNum.mockReturnValue(0);
    mockGetArticlesListIsLoading.mockReturnValue(false);

    await testAsyncThunk.callThunk();

    const dispatchCalls = testAsyncThunk.dispatch.mock.calls;
    const hasSetPageCall = dispatchCalls.some((call) => {
      const action = call[0];
      return action
        && typeof action === 'object'
        && 'type' in action
        && typeof action.type === 'string'
        && action.type.includes('setPage');
    });

    expect(hasSetPageCall).toBe(false);
  });

  it('should fetch articles and increment page when conditions are met', async () => {
    mockGetArticlesListIsHasMore.mockReturnValue(true);
    mockGetArticlesListNum.mockReturnValue(1);
    mockGetArticlesListIsLoading.mockReturnValue(false);

    await testAsyncThunk.callThunk();

    const dispatchCalls = testAsyncThunk.dispatch.mock.calls;

    const hasFunctionCall = dispatchCalls.some((call) => {
      const action = call[0];
      return typeof action === 'function';
    });

    const hasSetPageCall = dispatchCalls.some((call) => {
      const action = call[0];
      return action
        && typeof action === 'object'
        && 'type' in action
        && typeof action.type === 'string'
        && action.type.includes('setPage')
        && 'payload' in action
        && action.payload === 2;
    });

    expect(hasFunctionCall).toBe(true);
    expect(hasSetPageCall).toBe(true);
  });
});
