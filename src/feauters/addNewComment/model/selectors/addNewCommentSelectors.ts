import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentFormText = (state: StateSchema) => state.addNewComment?.text;
export const getCommentFormError = (state: StateSchema) => state.addNewComment?.error;
