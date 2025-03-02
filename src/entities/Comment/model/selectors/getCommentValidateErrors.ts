import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommentValidateErrors = (state: StateSchema) => state?.comments?.validateErrors;
