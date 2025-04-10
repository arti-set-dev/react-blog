import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { registration } from './registration';
import { userActions, UserRole } from '@/entities/User';

const mockLocalStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

const mockUser = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  roles: [UserRole.USER],
  avatar: 'test-avatar.jpg',
};

const mockFormData = {
  username: 'testuser',
  password: 'password123',
  email: 'test@example.com',
};

describe('registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should register user successfully', async () => {
    const thunk = new TestAsyncThunk(registration);
    const mockResponse = {
      data: {
        user: mockUser,
        accessToken: 'test-token',
      },
    };
    thunk.api.post.mockReturnValue(Promise.resolve(mockResponse));

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.post).toHaveBeenCalledWith('/auth/registration', expect.any(FormData));
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(mockUser));
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  test('should register user with avatar successfully', async () => {
    const thunk = new TestAsyncThunk(registration);
    const formDataWithAvatar = {
      ...mockFormData,
      file: new File([''], 'test.jpg'),
    };

    const mockResponse = {
      data: {
        user: mockUser,
        accessToken: 'test-token',
      },
    };
    thunk.api.post.mockReturnValue(Promise.resolve(mockResponse));

    const result = await thunk.callThunk(formDataWithAvatar);

    expect(thunk.api.post).toHaveBeenCalledWith('/auth/registration', expect.any(FormData));
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(mockUser));
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockUser);
  });

  test('should handle registration error', async () => {
    const thunk = new TestAsyncThunk(registration);
    thunk.api.post.mockReturnValue(Promise.reject(new Error('Registration error')));

    const result = await thunk.callThunk(mockFormData);

    expect(thunk.api.post).toHaveBeenCalledWith('/auth/registration', expect.any(FormData));
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Registration error');
  });
});
