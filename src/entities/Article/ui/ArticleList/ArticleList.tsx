import {
  forwardRef, memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import cl from './ArticleList.module.scss';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ArticleItemSkeletonRedesigned,
} from '../ArticleItem/ArticleItemRedesigned/ArticleItemSkeletonRedesigned';
import { List } from '@/shared/ui/deprecated/List';

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
  virtualized?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  style?: React.CSSProperties;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: React.ReactNode;
}

const gridComponents = {
  List: forwardRef<HTMLDivElement, ArticleListProps>(
    ({
      style, children, className, display, view, isLoading, articles, ...props
    }, ref) => (
      <div
        ref={ref}
        {...props}
        style={{ ...style }}
        className={classNames(cl.ArticleList, {}, [
          className,
          cl[view ?? ArticleView.GRID],
          cl[display ?? ArticleListDisplay.GRID],
        ])}
      >
        {children}
      </div>
    ),
  ),
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles = [],
    error,
    view = ArticleView.GRID,
    isLoading,
    display = ArticleListDisplay.GRID,
    blank = false,
    virtualized = false,
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

  if (!isLoading && !articles.length) {
    return <Text size={TextSize.L}>{t('No articles were found')}</Text>;
  }

  if (error) {
    return <Text size={TextSize.L}>{t('When loading articles, an error occurred')}</Text>;
  }

  if (virtualized) {
    return (
      <VirtuosoGrid
        useWindowScroll
        totalCount={isLoading ? articles.length + 7 : articles.length}
        components={{
          List: forwardRef((listProps, ref) => (
            <gridComponents.List
              {...listProps}
              ref={ref}
              display={display}
              view={view}
              isLoading={isLoading}
              articles={articles}
            />
          )),
        }}
        itemContent={(index) => {
          const article = articles[index];

          if (!article) {
            return (
              <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                  <ArticleItemSkeletonRedesigned key={index} view={view ?? ArticleView.GRID} />
                )}
                off={(
                  <ArticleItemSkeleton key={index} view={view ?? ArticleView.GRID} />
                )}
              />
            );
          }

          return (
            <ArticleItem
              className={cl.ArticleListItem}
              key={articles[index].id}
              article={articles[index]}
              view={view}
              blank={blank}
            />
          );
        }}
      />
    );
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
