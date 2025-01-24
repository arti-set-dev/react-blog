import axios from 'axios';
import { userActions, User, UserRole } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

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
      username: '123',
      id: '1',
      roles: [UserRole.ADMIN],
    };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockResolvedValueOnce({ data: userValue });
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue),
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalledWith('/login', {
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
    expect(thunk.api.post).toHaveBeenCalledWith('/login', {
      username: '123',
      password: '123',
    });
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
  });
});
