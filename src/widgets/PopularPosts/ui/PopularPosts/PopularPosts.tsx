import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { PopularPostsRedesigned } from './PopularPostsRedesigned/PopularPostsRedesigned';
import { PopularPostsDeprecated } from './PopularPostsDeprecated/PopularPostsDeprecated';
import { useFetchArticlesList } from '@/features/fetchArticlesList';
import { ArticleType } from '@/entities/Article';

interface PopularPostsProps {
    className?: string;
}

export const PopularPosts = memo((props: PopularPostsProps) => {
  const { className } = props;
  const { t } = useTranslation('main');

  const {
    data: articles, isFetching,
  } = useFetchArticlesList({
    limit: 8,
    type: ArticleType.ALL,
    sort: 'views',
  });

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <PopularPostsRedesigned
          articles={articles}
          isFetching={isFetching}
        />
      )}
      off={(
        <PopularPostsDeprecated
          articles={articles}
          isFetching={isFetching}
        />
      )}
    />
  );
});
