import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    verifyEmail: build.mutation<User, string>({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useVerifyEmailMutation } = authApi;
