import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleList } from '@/entities/Article';
import { Container } from '@/shared/ui/redesigned/Container';
import { ArticleCategoryProps } from '../ArticleCategoryRedesigned/ArticleCategoryRedesigned';

export const ArticleCategoryDeprecated = memo((props: ArticleCategoryProps) => {
  const {
    articles, onChangeType, type, isLoading, error,
  } = props;
  const { t } = useTranslation();

  return (
    <Card variant="transparent" border="0" tag="section" offset="24" className={getVstack({ gap: 24 })}>
      <Container max className={getVstack({ gap: 24 })}>
        <Text
          tag="h2"
          variant="primary"
          weight="bold"
          size="xl"
        >
          {t('Popular categories')}
        </Text>
        <ArticleTypeTabs direction="row" value={type} onChangeType={onChangeType} />
        <ArticleList articles={articles} isLoading={isLoading} error={error} />
      </Container>
    </Card>
  );
});
