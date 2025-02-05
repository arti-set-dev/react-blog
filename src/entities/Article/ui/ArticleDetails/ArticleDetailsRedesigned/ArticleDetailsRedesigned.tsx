import { memo, useCallback } from 'react';
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

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          key={block.id}
          block={block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={block.id}
          block={block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={block.id}
          block={block}
        />
      );
    default:
      return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <VStack gap="16" max>
        <Skeleton height={300} width="180%" border="20px" />
        <Skeleton height={20} width="400px" border="20px" />
        <Skeleton height={20} width="300px" border="20px" />
        <Skeleton height={100} width="100%" border="20px" />
        <Skeleton height={100} width="100%" border="20px" />
        <Skeleton height={100} width="100%" border="20px" />
        <Skeleton height={100} width="100%" border="20px" />
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
            alt={t('Article Details Page')}
          />
        </HStack>
        <VStack data-testid="ArticleDetails.Info" max gap="16">
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
