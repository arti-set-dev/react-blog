import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleList } from '@/entities/Article';
import { getArticles } from '../../model/slices/articlesPageSlice';
import {
  getArticlesPageIsError,
  getArticlesPageIsLoading,
  getArticlesPageIsView,
} from '../../model/selectors/articlesPageSelectors';

export const ArticleListContainer = memo(() => {
  const { t } = useTranslation();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageIsError);
  const view = useSelector(getArticlesPageIsView);

  if (error) {
    return <Text>{t('Data boot error')}</Text>;
  }

  return <ArticleList view={view} isLoading={isLoading} articles={articles} />;
});
