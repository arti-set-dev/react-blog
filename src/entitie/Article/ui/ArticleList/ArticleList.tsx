import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { List } from 'shared/ui/List/List';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import cl from './ArticleList.module.scss';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, view = ArticleView.GRID, isLoading,
  } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => (
    <ArticleItem article={article} view={view} />
  );

  if (isLoading) {
    return (
      <List className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
        {new Array(view === ArticleView.COLUMN ? 3 : 9)
          .fill(0)
          .map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ArticleItemSkeleton key={index} view={view} />
          ))}
      </List>
    );
  }

  return (
    <List className={classNames(cl.ArticleList, {}, [className, cl[view]])}>
      {articles.length
        ? articles.map(renderArticle)
        : <Text>{t('There are no articles at the moment')}</Text> }
    </List>
  );
});
