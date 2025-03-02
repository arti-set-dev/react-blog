import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommentsIsloading = (state: StateSchema) => state?.comments?.isLoading;
export const getCommentsError = (state: StateSchema) => state?.comments?.error;
