import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArticleType,
} from '@/entities/Article';
import { useFetchArticlesList } from '@/features/fetchArticlesList';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleCategoryRedesigned } from './ArticleCategoryRedesigned/ArticleCategoryRedesigned';
import { ArticleCategoryDeprecated } from './ArticleCategoryDeprecated/ArticleCategoryDeprecated';

export const ArticleCategory = memo(() => {
  const { t } = useTranslation();
  const [type, setType] = useState<ArticleType>(ArticleType.ALL);

  const {
    data: articles, isError, isFetching,
  } = useFetchArticlesList({
    type,
    limit: 8,
  });

  const onChangeType = useCallback((value: ArticleType) => {
    setType(value);
  }, []);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <ArticleCategoryRedesigned
          onChangeType={onChangeType}
          type={type}
          articles={articles}
          error={isError}
          isLoading={isFetching}
        />
      )}
      off={(
        <ArticleCategoryDeprecated
          onChangeType={onChangeType}
          type={type}
          articles={articles}
          error={isError}
          isLoading={isFetching}
        />
      )}
    />
  );
});
