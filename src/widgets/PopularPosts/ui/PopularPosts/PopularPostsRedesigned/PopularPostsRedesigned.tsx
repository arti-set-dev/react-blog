import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleListDisplay } from '@/entities/Article';
import { ArticlePopularList } from '@/features/articlePopularList';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

interface PopularPostsRedesignedProps {
    className?: string;
}

export const PopularPostsRedesigned = memo((props: PopularPostsRedesignedProps) => {
  const { className } = props;
  const { t } = useTranslation('main');

  return (
    <Card tag="section" offset="24" className={getVstack({ gap: 24 })}>
      <ArticlePopularList totalPosts={8} display={ArticleListDisplay.GRID} />
    </Card>
  );
});
