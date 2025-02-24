import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType } from '../../../model/types/articleType';
import { ArticleBlock, Article } from '../../../model/types/article';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {
  ArticleImageBlockComponent,
} from '../../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton, SkeletonAlign } from '@/shared/ui/deprecated/Skeleton';
import {
  Text, TextSize, TextTheme, TextWeight,
} from '@/shared/ui/deprecated/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import cl from './ArticleDetailsDeprecated.module.scss';
import { ArticleDetailsProps } from '../ArticleDetails';

interface ArticleDetailsDeprecatedProps extends ArticleDetailsProps {
  className?: string;
  isLoading?: boolean;
  error?: string;
  article?: Article;
}

export const ArticleDetailsDeprecated = memo((props: ArticleDetailsDeprecatedProps) => {
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
          className={cl.Block}
          block={block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={block.id}
          className={cl.Block}
          block={block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={block.id}
          className={cl.Block}
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
      <VStack gap="16" fullWidth>
        <Skeleton height={180} width={180} border="50%" />
        <Skeleton align={SkeletonAlign.LEFT} height={20} width="400px" />
        <Skeleton align={SkeletonAlign.LEFT} height={20} width="300px" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
        <Skeleton height={100} width="100%" />
      </VStack>
    );
  } else if (error) {
    content = (
      <HStack className={cl.Error}>
        <Text size={TextSize.L} theme={TextTheme.ERROR}>
          {t('There was an error loading the article')}
        </Text>
      </HStack>
    );
  } else {
    content = (
      <>
        <HStack justify="center" fullWidth>
          <Avatar
            className={cl.Avatar}
            size={180}
            src={article?.img}
            alt={t('Article Details Page')}
          />
        </HStack>
        <VStack data-testid="ArticleDetails.Info" fullWidth gap="16">
          <Text
            tag="h1"
            theme={TextTheme.PRIMARY}
            size={TextSize.XL}
            weight={TextWeight.BOLD}
          >
            {article?.title}
          </Text>
          <Text
            theme={TextTheme.PRIMARY}
            size={TextSize.XS}
            weight={TextWeight.REGULAR}
          >
            {article?.subtitle}
          </Text>
          <div className={cl.Meta}>
            <Text className={cl.MetaLink} size={TextSize.XS}>
              <ViewsIcon />
              {String(article?.views)}
            </Text>
            <Text className={cl.MetaLink} size={TextSize.XS}>
              <CalendarIcon />
              {article?.createdAt}
            </Text>
          </div>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return content;
});
