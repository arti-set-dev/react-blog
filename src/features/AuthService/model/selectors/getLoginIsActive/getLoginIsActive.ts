import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginIsActive = (state: StateSchema) => state?.loginForm?.authData?.isEmailVerified || false;
