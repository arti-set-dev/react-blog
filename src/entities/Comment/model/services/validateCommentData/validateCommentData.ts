import { ValidateCommentError } from '../../const/const';
import { Comment } from '../../types/comments';

export const validateCommentData = (comment?: Comment) => {
  if (!comment) {
    return [ValidateCommentError.NO_DATA];
  }

  const {
    text,
  } = comment;

  const errors: ValidateCommentError[] = [];

  if (!text) {
    errors.push(ValidateCommentError.NO_DATA);
  }

  return errors;
};
