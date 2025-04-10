import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/user';
import { JsonSettings } from '../model/types/jsonSettings';
import { Theme } from '@/shared/const/theme';

jest.mock('@/shared/api/rtkApi', () => ({
  rtkApi: {
    injectEndpoints: jest.fn().mockReturnValue({
      endpoints: {
        setJsonSettings: {
          useMutation: jest.fn().mockReturnValue([jest.fn(), {}]),
        },
        getUserDataById: {
          useQuery: jest.fn().mockReturnValue({}),
        },
      },
    }),
  },
}));

const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  jsonSettings: {
    theme: Theme.LIGHT,
    isArticlePageWasOpened: false,
  },
};

const mockJsonSettings: JsonSettings = {
  theme: Theme.DARK,
  isArticlePageWasOpened: true,
};

describe('userApi', () => {
  it('should inject endpoints correctly', () => {
    const { setJsonSettings, getUserDataById } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        setJsonSettings: build.mutation<User, { userId: string; jsonSettings: JsonSettings }>({
          query: ({ userId, jsonSettings }) => ({
            url: `/users/${userId}/json-settings`,
            method: 'PATCH',
            body: jsonSettings,
          }),
        }),
        getUserDataById: build.query<User, string>({
          query: (userId) => ({
            url: `/users/${userId}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints;

    expect(setJsonSettings).toBeDefined();
    expect(getUserDataById).toBeDefined();
  });

  it('should call setJsonSettings mutation with correct parameters', () => {
    const [setJsonSettings] = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        setJsonSettings: build.mutation<User, { userId: string; jsonSettings: JsonSettings }>({
          query: ({ userId, jsonSettings }) => ({
            url: `/users/${userId}/json-settings`,
            method: 'PATCH',
            body: jsonSettings,
          }),
        }),
      }),
    }).endpoints.setJsonSettings.useMutation();

    setJsonSettings({ userId: mockUser.id, jsonSettings: mockJsonSettings });

    expect(setJsonSettings).toHaveBeenCalledWith({
      userId: mockUser.id,
      jsonSettings: mockJsonSettings,
    });
  });

  it('should call getUserDataById query with correct parameters', () => {
    const { getUserDataById } = rtkApi.injectEndpoints({
      endpoints: (build) => ({
        getUserDataById: build.query<User, string>({
          query: (userId) => ({
            url: `/users/${userId}`,
            method: 'GET',
          }),
        }),
      }),
    }).endpoints;

    getUserDataById.useQuery(mockUser.id);

    expect(getUserDataById.useQuery).toHaveBeenCalledWith(mockUser.id);
  });
});
