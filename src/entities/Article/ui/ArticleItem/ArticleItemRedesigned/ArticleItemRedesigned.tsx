import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
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
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleItemRedesigned.module.scss';
import { useArticle } from '../../../lib/hooks/useArticle';

export const ArticleItemRedesigned = memo((props: ArticleItemProps) => {
  const {
    className, article, view, blank,
  } = props;
  const { t } = useTranslation();
  const { onOpenArticle } = useArticle(article.id);

  const articleTypes = useMemo(
    () => (
      <HStack gap="4" width="60%" overflow="auto">
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
        <Card max isOverflow offset="24" className={getVstack({ gap: 16 })}>
          <HStack gap="8">
            <Avatar
              size={30}
              src={article.user?.avatar}
              alt={article.user?.username}
            />
            <Text
              size="m"
              weight="bold"
            >
              {article.user?.username}
            </Text>
            <Text size="s">{article.createdAt}</Text>
          </HStack>
          <AppLink to={getRouteArticleDetails(article.id)}>
            <VStack gap="16">
              <Text isHovered size="xl">
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
            <Button variant="outline" onClick={onOpenArticle}>{t('Read more')}</Button>
            {views}
          </HStack>
        </Card>
      </VStack>
    );
  }

  return (
    <VStack
      tag="li"
      data-testid="ArticlesItem"
      className={classNames('', {}, [className, cl[view]])}
    >
      {blank ? (
        <Card isOverflow offset="0" max className={cl.Card}>
          <Text variant="inverted" className={cl.createdAt}>
            {article.createdAt}
          </Text>
          <AppLink
            to={getRouteArticleDetails(article.id)}
            target="_blank"
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              width="100%"
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <Card tag="div" offset="16" className={getVstack({ gap: 16 })}>
            <HStack justify="between" gap="8">
              {articleTypes}
              {views}
            </HStack>
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target="_blank"
            >
              <Text isHovered size="m" weight="bold">
                {article.title}
              </Text>
            </AppLink>
          </Card>
        </Card>
      ) : (
        <Card isOverflow isHovered max offset="0" className={cl.Card}>
          <Text variant="inverted" className={cl.createdAt}>
            {article.createdAt}
          </Text>
          <AppLink
            to={getRouteArticleDetails(article.id)}
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              width="100%"
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <Card tag="div" offset="16" className={getVstack({ gap: 16 })}>
            <HStack justify="between" gap="8">
              {articleTypes}
              {views}
            </HStack>
            <AppLink
              to={getRouteArticleDetails(article.id)}
            >
              <Text isHovered size="m" weight="bold">
                {article.title}
              </Text>
            </AppLink>
          </Card>
        </Card>
      )}
    </VStack>
  );
});
