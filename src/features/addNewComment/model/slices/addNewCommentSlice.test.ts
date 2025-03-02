// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports,arti-set-fsd-checker-plugin/public-api-imports,max-len
import { addComment } from '@/entities/Comment/model/services/addComment/addComment';
import { AddNewCommentSchema } from '../types/addNewComment';
import { addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice.test', () => {
  test('test set text', () => {
    const state: DeepPartial<AddNewCommentSchema> = {
      text: 'some comment',
    };
    expect(
      addNewCommentReducer(
        state as AddNewCommentSchema,
        addComment.pending,
      ),
    ).toEqual({
      text: 'some comment',
    });
  });
  test('test error value', () => {
    const state: DeepPartial<AddNewCommentSchema> = {
      error: 'error',
    };
    expect(
      addNewCommentReducer(
        state as AddNewCommentSchema,
        addComment.rejected,
      ),
    ).toEqual({
      error: 'error',
    });
  });
});
