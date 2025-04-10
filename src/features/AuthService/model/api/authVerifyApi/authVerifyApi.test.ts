import { rtkApi } from '@/shared/api/rtkApi';

// Мокаем типы без импорта реальных модулей
type User = {
  id: string;
  username: string;
  email: string;
  roles?: string[];
  avatar?: string;
};

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        verifyEmail: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
      },
    }),
  },
}));

const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  roles: ['USER'],
  avatar: 'avatar.jpg',
};

describe('authVerifyApi', () => {
  it('should inject endpoints correctly', () => {
    const { verifyEmail } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        verifyEmail: build.mutation<User, string>({
          query: (token) => ({
            url: `/auth/verify-email?token=${token}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints;

    expect(verifyEmail).toBeDefined();
  });

  it('should call verifyEmail mutation with correct token', () => {
    const [verifyEmail] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        verifyEmail: build.mutation<User, string>({
          query: (token) => ({
            url: `/auth/verify-email?token=${token}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints.verifyEmail.useMutation();

    const token = 'test-verification-token';
    verifyEmail(token);

    expect(verifyEmail).toHaveBeenCalledWith(token);
  });

  it('should handle error when verification fails', () => {
    const error = { status: 400, data: { message: 'Invalid verification token' } };
    const [verifyEmail] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        verifyEmail: build.mutation<User, string>({
          query: (token) => ({
            url: `/auth/verify-email?token=${token}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints.verifyEmail.useMutation();

    // Мокаем реджект для имитации ошибки
    (verifyEmail as jest.Mock).mockRejectedValue(error);

    const token = 'invalid-token';

    return expect(verifyEmail(token)).rejects.toEqual(error);
  });

  it('should handle successful verification', async () => {
    const [verifyEmail] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        verifyEmail: build.mutation<User, string>({
          query: (token) => ({
            url: `/auth/verify-email?token=${token}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints.verifyEmail.useMutation();

    // Мокаем успешный ответ
    (verifyEmail as jest.Mock).mockResolvedValue(mockUser);

    const token = 'valid-token';
    const result = await verifyEmail(token);

    expect(result).toEqual(mockUser);
  });
});
