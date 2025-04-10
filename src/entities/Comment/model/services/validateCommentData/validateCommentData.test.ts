import { validateCommentData } from './validateCommentData';
import { ValidateCommentError } from '../../const/const';
import { Comment } from '../../types/comments';

describe('validateCommentData', () => {
  const mockComment: Comment = {
    id: '1',
    text: 'Test comment',
    user: {
      id: '1',
      username: 'testuser',
      email: 'testuser@example.com',
    },
  };

  test('success validate comment', () => {
    const result = validateCommentData(mockComment);
    expect(result).toEqual([]);
  });

  test('error validate comment - no comment', () => {
    const result = validateCommentData(undefined);
    expect(result).toEqual([ValidateCommentError.NO_DATA]);
  });

  test('error validate comment - empty text', () => {
    const result = validateCommentData({
      ...mockComment,
      text: '',
    });
    expect(result).toEqual([ValidateCommentError.NO_DATA]);
  });

  test('error validate comment - undefined text', () => {
    const result = validateCommentData({
      ...mockComment,
      text: undefined as unknown as string,
    });
    expect(result).toEqual([ValidateCommentError.NO_DATA]);
  });
});
