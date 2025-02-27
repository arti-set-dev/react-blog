import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { PopularPostsRedesigned } from './PopularPostsRedesigned/PopularPostsRedesigned';
import { PopularPostsDeprecated } from './PopularPostsDeprecated/PopularPostsDeprecated';

interface PopularPostsProps {
    className?: string;
}

export const PopularPosts = memo((props: PopularPostsProps) => {
  const { className } = props;
  const { t } = useTranslation('main');

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <PopularPostsRedesigned />
      )}
      off={(
        <PopularPostsDeprecated />
      )}
    />
  );
});
