import { memo } from 'react';
import { ArticleItemRedesigned } from './ArticleItemRedesigned/ArticleItemRedesigned';
import {
  ArticleItemDeprecated,
} from './ArticleItemDeprecated/ArticleItemDeprecated';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';

export interface ArticleItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  blank?: boolean;
}

export const ArticleItem = memo((props: ArticleItemProps) => (
  <ToggleFeatures
    feature="isAppRedesigned"
    on={(
      <ArticleItemRedesigned {...props} />
    )}
    off={(
      <ArticleItemDeprecated {...props} />
    )}
  />
));
