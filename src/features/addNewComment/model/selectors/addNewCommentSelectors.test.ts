import { StateSchema } from '@/app/providers/StoreProvider';
import {
  getCommentFormError,
  getCommentFormText,
} from './addNewCommentSelectors';

describe('addNewCommentSelectors.test', () => {
  test('should return Error', () => {
    const state: DeepPartial<StateSchema> = {
      addNewComment: {
        error: 'error',
      },
    };
    expect(getCommentFormError(state as StateSchema)).toEqual('error');
  });
  test('should return text', () => {
    const state: DeepPartial<StateSchema> = {
      addNewComment: {
        text: 'new comment',
      },
    };
    expect(getCommentFormText(state as StateSchema)).toEqual('new comment');
  });
});
