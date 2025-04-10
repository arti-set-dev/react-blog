import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';
import { rtkApi } from '@/shared/api/rtkApi';

interface SetJsonSettings {
  userId?: string;
  jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettings>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { setJsonSettings, getUserDataById } = userApi.endpoints;

export const setJsonSettingsMutation = (options: SetJsonSettings) => ({
  type: 'setJsonSettings',
  payload: options,
});

export const getUserDataByIdQuery = (userId: string) => ({
  type: 'getUserDataById',
  payload: userId,
});
