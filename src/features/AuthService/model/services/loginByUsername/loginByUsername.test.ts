import { userActions, User, UserRole } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

describe('loginByUsername.test', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  test('successful common', async () => {
    const userValue: User = {
      email: 'test@test.com',
      username: '123',
      id: '1',
      roles: [UserRole.ADMIN],
    };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockResolvedValueOnce({ data: { user: userValue, accessToken: 'token' } });
    const result = await thunk.callThunk({ username: '123', password: '123' });

    const dispatchCalls = thunk.dispatch.mock.calls;
    const setAuthDataCall = dispatchCalls.find((call) => {
      if (!call[0] || typeof call[0] !== 'object') return false;
      return 'type' in call[0] && call[0].type === userActions.setAuthData.type;
    });

    expect(setAuthDataCall).toBeTruthy();
    if (setAuthDataCall) {
      const action = setAuthDataCall[0] as ReturnType<typeof userActions.setAuthData>;
      expect(action.payload).toEqual(userValue);
    }

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalledWith('/auth/login', {
      username: '123',
      password: '123',
    });
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toBe(userValue);
  });

  test('rejected login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockRejectedValueOnce(new Error('Forbidden'));
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalledWith('/auth/login', {
      username: '123',
      password: '123',
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Authentication error');
  });
});
