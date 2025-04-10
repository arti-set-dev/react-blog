import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { authVerify } from './authVerify';

type User = {
  id: string;
  username: string;
  email: string;
  roles?: string[];
  avatar?: string;
};

const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  roles: ['USER'],
  avatar: 'avatar.jpg',
};

describe('authVerify', () => {
  test('should verify email successfully', async () => {
    const thunk = new TestAsyncThunk(authVerify);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockUser }));

    const token = 'valid-token';
    const result = await thunk.callThunk(token);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/auth/verify-email?token=valid-token');
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  test('should handle empty response data', async () => {
    const thunk = new TestAsyncThunk(authVerify);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }));

    const token = 'valid-token';
    const result = await thunk.callThunk(token);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Authentication error');
  });

  test('should handle server error', async () => {
    const thunk = new TestAsyncThunk(authVerify);
    thunk.api.get.mockRejectedValue({ status: 500 });

    const token = 'valid-token';
    const result = await thunk.callThunk(token);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Authentication error');
  });

  test('should handle invalid token', async () => {
    const thunk = new TestAsyncThunk(authVerify);
    thunk.api.get.mockRejectedValue({ status: 400, data: { message: 'Invalid token' } });

    const token = 'invalid-token';
    const result = await thunk.callThunk(token);

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.api.get).toHaveBeenCalledWith('/auth/verify-email?token=invalid-token');
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Authentication error');
  });
});
