import { Article, ArticleEditable } from './article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Article;
  form?: ArticleEditable;
}
