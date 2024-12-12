import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
import {
  Article, ArticleView, ArticleSortField, ArticleType,
} from './model/types/article';
import type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
import { ArticleList } from './ui/ArticleList/ArticleList';
import { ArticleViewSwither } from './ui/ArticleViewSwither/ArticleViewSwither';
import { ArticleSortSelector } from './ui/ArticleSortSelector/ArticleSortSelector';
import { ArticleTypeTabs } from './ui/ArticleTypeTabs/ArticleTypeTabs';
import { getArticleDetailsData } from './model/selectors/articleDetails';

export {
  ArticleDetails,
  Article,
  ArticleDetailsSchema,
  ArticleView,
  ArticleList,
  ArticleViewSwither, ArticleSortField, ArticleSortSelector, ArticleType, ArticleTypeTabs, getArticleDetailsData,
};
