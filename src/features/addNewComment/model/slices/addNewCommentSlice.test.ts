import { Article, ArticleDetailsSchema } from '@/entities/Article';
// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports,arti-set-fsd-checker-plugin/public-api-imports
import { addCommentForArticle } from
  '@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { AddNewCommentSchema } from '../types/addNewComment';
import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice.test', () => {
  test('test set text', () => {
    const state: DeepPartial<AddNewCommentSchema> = {
      text: 'some comment',
    };
    expect(addNewCommentReducer(
            state as AddNewCommentSchema,
            addCommentForArticle.pending,
    )).toEqual({
      text: 'some comment',
    });
  });
  test('test error value', () => {
    const state: DeepPartial<AddNewCommentSchema> = {
      error: 'error',
    };
    expect(addNewCommentReducer(
      state as AddNewCommentSchema,
      addCommentForArticle.rejected,
    )).toEqual({
      error: 'error',
    });
  });
});
