import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Container } from '@/shared/ui/redesigned/Container';
import { Article, ArticleList, ArticleListDisplay } from '@/entities/Article';
import { Text } from '@/shared/ui/redesigned/Text';

interface PopularPostsDeprecatedProps {
    className?: string;
    articles?: Article[];
    isFetching: boolean;
}

export const PopularPostsDeprecated = memo((props: PopularPostsDeprecatedProps) => {
  const { className, articles, isFetching } = props;
  const { t } = useTranslation('main');

  return (
    <Card variant="transparent" border="0" tag="section" offset="24">
      <Container max className={getVstack({ gap: 24 })}>
        <Text
          tag="h2"
          variant="primary"
          weight="bold"
          size="xl"
        >
          {t('Posts of the week')}
        </Text>
        <ArticleList
          isLoading={isFetching}
          display={ArticleListDisplay.GRID}
          articles={articles}
        />
      </Container>
    </Card>
  );
});
