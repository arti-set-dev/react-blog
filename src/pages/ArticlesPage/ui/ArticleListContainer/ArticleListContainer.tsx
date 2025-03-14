import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/deprecated/Text';
import {
  ArticleList, getArticlesListError, getArticlesListIsLoading, getArticlesListView,
  getArticles,
} from '@/entities/Article';

export const ArticleListContainer = memo(() => {
  const { t } = useTranslation();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesListIsLoading);
  const error = useSelector(getArticlesListError);
  const view = useSelector(getArticlesListView);

  if (error) {
    return <Text>{t('Data boot error')}</Text>;
  }

  return <ArticleList virtualized view={view} isLoading={isLoading} articles={articles} />;
});
