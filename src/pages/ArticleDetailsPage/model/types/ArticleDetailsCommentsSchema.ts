import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';
// eslint-disable-next-line arti-set-fsd-checker-plugin/public-api-imports
import { ValidateCommentError } from '@/entities/Comment/model/const/const';

interface ValidateErrorItem {
  id: string;
  errors: ValidateCommentError[];
}

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading: boolean;
  error?: string;
  data?: Comment[];
  validateErrors?: ValidateErrorItem[];
}
