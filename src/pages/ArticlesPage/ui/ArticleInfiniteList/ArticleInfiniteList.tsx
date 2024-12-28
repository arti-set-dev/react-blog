import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui/Text';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { getArticlesPageIsError, getArticlesPageIsLoading, getArticlesPageIsView }
  from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageIsError);
  const view = useSelector(getArticlesPageIsView);
  const [searchParams] = useSearchParams();

  if (error) {
    return (
      <Text>{t('Data boot error')}</Text>
    );
  }

  return (
    <ArticleList view={view} isLoading={isLoading} articles={articles} />
  );
});
