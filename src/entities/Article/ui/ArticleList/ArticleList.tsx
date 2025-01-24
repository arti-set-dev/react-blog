import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { List } from '@/shared/ui/List';
import { Text, TextSize } from '@/shared/ui/Text';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import cl from './ArticleList.module.scss';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

export enum ArticleListDisplay {
  FLEX = 'display-flex',
  GRID = 'display-grid',
}

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  display?: ArticleListDisplay;
  blank?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
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

  if (!isLoading && !articles.length) {
    return <Text size={TextSize.L}>{t('No articles were found')}</Text>;
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
      {articles.length ? articles.map(renderArticle) : null}
      {isLoading && (
        <>
          {new Array(view === ArticleView.COLUMN ? 3 : 9)
            .fill(0)
            .map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ArticleItemSkeleton key={index} view={view} />
            ))}
        </>
      )}
    </List>
  );
});
