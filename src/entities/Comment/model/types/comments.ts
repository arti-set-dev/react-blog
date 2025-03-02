import { EntityState } from '@reduxjs/toolkit';
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

interface ValidateErrorItem {
  id: string;
  errors: ValidateCommentError[];
}

export interface CommentsSchema extends EntityState<Comment> {
  isLoading: boolean;
  error?: string;
  data?: Comment[];
  validateErrors?: ValidateErrorItem[];
}
