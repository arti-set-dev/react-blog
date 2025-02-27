import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleListDisplay } from '@/entities/Article';
import { ArticlePopularList } from '@/features/articlePopularList';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Container } from '@/shared/ui/redesigned/Container';

interface PopularPostsDeprecatedProps {
    className?: string;
}

export const PopularPostsDeprecated = memo((props: PopularPostsDeprecatedProps) => {
  const { className } = props;
  const { t } = useTranslation('main');

  return (
    <Card border="0" tag="section" offset="24">
      <Container max className={getVstack({ gap: 24 })}>
        <ArticlePopularList totalPosts={8} display={ArticleListDisplay.GRID} />
      </Container>
    </Card>
  );
});
