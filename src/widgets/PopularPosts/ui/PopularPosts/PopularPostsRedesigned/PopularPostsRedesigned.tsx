import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Article, ArticleList, ArticleListDisplay } from '@/entities/Article';
import { Text } from '@/shared/ui/redesigned/Text';

interface PopularPostsRedesignedProps {
    className?: string;
    articles?: Article[];
    isFetching: boolean;
}

export const PopularPostsRedesigned = memo((props: PopularPostsRedesignedProps) => {
  const {
    className, articles, isFetching,
  } = props;
  const { t } = useTranslation('main');

  return (
    <Card tag="section" offset="24" className={getVstack({ gap: 24 })}>
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
    </Card>
  );
});
