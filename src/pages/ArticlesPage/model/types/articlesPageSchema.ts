import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entitie/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
}
