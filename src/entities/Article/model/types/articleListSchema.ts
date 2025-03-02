import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/SortOrder';
import { ArticleView } from '../consts/consts';
import { ArticleSortField, ArticleType } from './articleType';
import { Article } from './article';

export interface ArticleListSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  types: ArticleType;
  _inited: boolean;
}

export interface ArticleRecommendationsSchema
  extends EntityState<Article> {
  isLoading: boolean;
  error?: string;
  data?: Comment[];
}
