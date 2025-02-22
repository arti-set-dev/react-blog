import { User } from '@/entities/User';
import { ValidateCommentError } from '../const/const';

export interface Comment {
  id: string;
  user?: User;
  text: string;
}

export interface CommentSchema {
  data?: Comment;
  isLoading: boolean;
  error?: string;
  validateErrors?: ValidateCommentError[];
}
