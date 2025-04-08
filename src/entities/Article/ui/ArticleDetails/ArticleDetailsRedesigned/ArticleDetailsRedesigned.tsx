import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { ArticleBlockType } from '../../../model/types/articleType';
import { ArticleBlock, Article } from '../../../model/types/article';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleDetailsProps } from '../ArticleDetails';
import {
  ArticleImageBlockComponent,
} from '../../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import {
  Text,
} from '@/shared/ui/redesigned/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticleDetailsRedesignedProps extends ArticleDetailsProps {
  className?: string;
  isLoading?: boolean;
  error?: string;
  article?: Article;
}

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsRedesignedProps) => {
  const {
    className, error, isLoading, article,
  } = props;
  const { t } = useTranslation();

  const articleTypes = useMemo(
    () => (
      <HStack gap="4" width="60%" overflow="auto">
        {article?.type.map((type, index) => (
          <Card offset="4" variant="active" tag="div" key={`${type}-${index}`}>
            {type}
          </Card>
        ))}
      </HStack>
    ),
    [article?.type],
  );

  const renderBlock = useCallback((block: ArticleBlock) => {
    const blockId = block.id || crypto.randomUUID();

    switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={blockId}
          block={{ ...block, id: blockId }}
        />
      );
    default:
      return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <VStack gap="16" fullWidth>
        <Skeleton height={300} width="180%" border="20" />
        <Skeleton height={20} width="400px" border="20" />
        <Skeleton height={20} width="300px" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
        <Skeleton height={100} width="100%" border="20" />
      </VStack>
    );
  } else if (error) {
    content = (
      <HStack>
        <Text size="l" variant="error">
          {t('There was an error loading the article')}
        </Text>
      </HStack>
    );
  } else {
    content = (
      <>
        <HStack justify="center">
          <LazyImage
            border="radius_l"
            width="100%"
            height="300px"
            src={article?.img}
            alt={article?.title}
          />
        </HStack>
        {articleTypes}
        <VStack data-testid="ArticleDetails.Info" fullWidth gap="16">
          <Text
            tag="h1"
            variant="primary"
            size="xl"
            weight="bold"
          >
            {article?.title}
          </Text>
          <Text
            variant="primary"
            size="xs"
            weight="normal"
          >
            {article?.subtitle}
          </Text>
          <VStack>
            <Text size="xs" className={getHstack({ align: 'center', gap: 8 })}>
              <Icon Svg={ViewsIcon} />
              {String(article?.views)}
            </Text>
            <Text size="xs" className={getHstack({ align: 'center', gap: 8 })}>
              <Icon Svg={CalendarIcon} />
              {article?.createdAt}
            </Text>
          </VStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return content;
});
