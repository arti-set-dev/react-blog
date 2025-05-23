import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import {
  ArticleList, getArticlesListError, getArticlesListIsLoading, getArticlesListView,
  getArticles,
} from '@/entities/Article';

interface ArticleListContainerProps {
  onScrollEnd: () => void;
}

export const ArticleListContainer = memo((props: ArticleListContainerProps) => {
  const { onScrollEnd } = props;
  const { t } = useTranslation('article');
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesListIsLoading);
  const error = useSelector(getArticlesListError);
  const view = useSelector(getArticlesListView);

  if (error) {
    return <Text align={TextAlign.CENTER} size={TextSize.L}>{t('Data boot error')}</Text>;
  }

  return (
    <ArticleList
      onScrollEnd={onScrollEnd}
      view={view}
      isLoading={isLoading}
      articles={articles}
    />
  );
});
