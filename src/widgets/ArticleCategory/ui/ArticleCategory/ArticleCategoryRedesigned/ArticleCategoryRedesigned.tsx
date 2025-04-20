import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Article, ArticleList, ArticleType } from '@/entities/Article';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

export interface ArticleCategoryProps {
  isLoading?: boolean;
  type: ArticleType;
  articles?: Article[];
  error: boolean;
  onChangeType: (article: ArticleType) => void;
}

export const ArticleCategoryRedesigned = memo((props: ArticleCategoryProps) => {
  const {
    articles, isLoading, onChangeType, type, error,
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
        {t('Popular categories')}
      </Text>
      <ArticleTypeTabs flexWrap="wrap" direction="initial" value={type} onChangeType={onChangeType} />
      <ArticleList
        invertOnHover
        articles={articles}
        isLoading={isLoading}
        error={error}
      />
    </Card>
  );
});
