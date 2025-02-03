import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleBlockType } from '../../../model/types/articleType';
import { ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleItemProps } from '../ArticleItem';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleItemRedesigned.module.scss';

export const ArticleItemRedesigned = memo((props: ArticleItemProps) => {
  const {
    className, article, view, blank,
  } = props;
  const { t } = useTranslation();

  const articleTypes = useMemo(
    () => (
      <HStack gap="4">
        {article.type.map((type, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card offset="4" variant="active" tag="div" key={index}>
            {type}
          </Card>
        ))}
      </HStack>
    ),
    [article.type],
  );

  const views = (
    <HStack gap="4" align="center">
      {article.views}
      <Icon Svg={ViewsIcon} />
    </HStack>
  );

  if (view === ArticleView.COLUMN) {
    const textBlocks = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <VStack
        tag="li"
        data-testid="ArticlesItem"
        className={classNames('', {}, [className, cl[view]])}
      >
        <Card offset="24" className={getVstack({ gap: 16 })}>
          <HStack>
            <Avatar
              size={30}
              src={article.user.avatar}
              alt={article.user.username}
            />
            <Text
              size="m"
              weight="bold"
            >
              {article.user.username}
            </Text>
            <Text size="s">{article.createdAt}</Text>
          </HStack>
          <AppLink to={getRouteArticleDetails(article.id)}>
            <VStack gap="16">
              <Text size="xl">
                {article.title}
              </Text>
              <Text size="m">
                {article.subtitle}
              </Text>
            </VStack>
          </AppLink>
          {articleTypes}
          <AppLink
            to={getRouteArticleDetails(article.id)}
          >
            <LazyImage
              width="100%"
              height={300}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          {textBlocks && (
            <ArticleTextBlockComponent
              className={cl.TextComponent}
              block={textBlocks}
            />
          )}
          <HStack gap="16" justify="between">
            <Button theme={ButtonTheme.OUTLINE}>{t('Read more')}</Button>
            {views}
          </HStack>
        </Card>
      </VStack>
    );
  }

  return (
    <VStack
      data-testid="ArticlesItem"
      className={classNames('', {}, [className, cl[view]])}
    >
      {blank ? (
        <Card isHovered>
          <Text>
            {article.createdAt}
          </Text>
          <AppLink
            to={getRouteArticleDetails(article.id)}
            target="_blank"
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              width={280}
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <VStack>
            <HStack>
              {articleTypes}
              {views}
            </HStack>
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target="_blank"
            >
              <Text size="m" weight="bold">
                {article.title}
              </Text>
            </AppLink>
          </VStack>
        </Card>
      ) : (
        <Card>
          <Text>
            {article.createdAt}
          </Text>
          <AppLink
            to={getRouteArticleDetails(article.id)}
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <VStack>
            <HStack>
              {articleTypes}
              {views}
            </HStack>
            <AppLink
              to={getRouteArticleDetails(article.id)}
            >
              <Text size="m" weight="bold">
                {article.title}
              </Text>
            </AppLink>
          </VStack>
        </Card>
      )}
    </VStack>
  );
});
