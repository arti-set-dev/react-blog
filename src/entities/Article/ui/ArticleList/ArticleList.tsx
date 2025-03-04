import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArticleItemSkeletonRedesigned,
} from '../ArticleItem/ArticleItemRedesigned/ArticleItemSkeletonRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { List } from '@/shared/ui/deprecated/List';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import cl from './ArticleList.module.scss';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

export enum ArticleListDisplay {
  GRID = 'display-grid',
  FLEX = 'display-flex',
}

interface ArticleListProps {
  className?: string;
  articles?: Article[];
  isLoading?: boolean;
  error?: boolean;
  view?: ArticleView;
  display?: ArticleListDisplay;
  blank?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    error,
    view = ArticleView.GRID,
    isLoading,
    display = ArticleListDisplay.GRID,
    blank = false,
  } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleItem
      className={cl.ArticleListItem}
      key={article.id}
      article={article}
      view={view}
      blank={blank}
    />
  );

  if (!isLoading && !articles?.length) {
    return <Text size={TextSize.L}>{t('No articles were found')}</Text>;
  }

  if (error) {
    <Text size={TextSize.L}>{t('When loading articles, an error occurred')}</Text>;
  }

  return (
    <List
      data-testid="ArticlesList"
      className={classNames(cl.ArticleList, {}, [
        className,
        cl[view],
        cl[display],
      ])}
    >
      {articles?.length ? articles.map(renderArticle) : null}
      {isLoading && (
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <>
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
              <ArticleItemSkeletonRedesigned view={view} />
            </>
          )}
          off={(
            <>
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
              <ArticleItemSkeleton view={view} />
            </>
          )}
        />
      )}
    </List>
  );
});
