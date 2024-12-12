import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entitie/Article';

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    data?: Comment[];
}
