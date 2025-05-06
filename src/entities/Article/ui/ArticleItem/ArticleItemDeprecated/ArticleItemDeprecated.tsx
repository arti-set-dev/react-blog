import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType } from '../../../model/types/articleType';
import { ArticleView } from '../../../model/consts/consts';
import { useArticle } from '../../../lib/hooks/useArticle';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleItemProps } from '../ArticleItem';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextSize, TextWeight } from '@/shared/ui/deprecated/Text';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ArticleItemDeprecated.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { useGetUserDataById } from '@/entities/User';

export const ArticleItemDeprecated = memo((props: ArticleItemProps) => {
  const {
    className, article, view, blank,
  } = props;
  const { t } = useTranslation();
  const { onOpenArticle } = useArticle(article.id ?? '');
  const { data: userData, isLoading } = useGetUserDataById(article.userId ?? '');

  const articleTypes = useMemo(
    () => (
      <div className={cl.Tags}>
        {article.type.map((type, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} className={cl.Tag}>
            {type}
          </Text>
        ))}
      </div>
    ),
    [article.type],
  );

  const views = (
    <div className={cl.Views}>
      {article.views}
      <ViewsIcon />
    </div>
  );

  if (view === ArticleView.COLUMN) {
    const textBlocks = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <li
        data-testid="ArticlesItem"
        className={classNames(cl.ArticleItem, {}, [className, cl[view]])}
      >
        <Card className={cl.Card}>
          <HStack gap="8">
            <Avatar
              size={30}
              src={userData?.avatar}
              alt={userData?.username}
            />
            <Text
              size={TextSize.M}
              weight={TextWeight.BOLD}
            >
              {userData?.username}
            </Text>
            <Text size={TextSize.S}>{article.createdAt}</Text>
          </HStack>
          <AppLink to={getRouteArticleDetails(article.id ?? '')}>
            <Text tag="h2" cropped="1" className={cl.Title} size={TextSize.XL}>
              {article.title}
            </Text>
            <Text cropped="1" className={cl.Subtitle} size={TextSize.M}>
              {article.subtitle}
            </Text>
          </AppLink>
          {articleTypes}
          <AppLink
            className={cl.LinkImg}
            to={getRouteArticleDetails(article.id ?? '')}
          >
            <LazyImage
              height={300}
              width="100%"
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <HStack
            overflow="hidden"
            align="start"
            height={90}
            className={classNames('', { [cl.isShadow]: !!textBlocks }, [])}
          >
            {textBlocks && (
              <ArticleTextBlockComponent
                className={cl.TextComponent}
                block={textBlocks}
              />
            )}
          </HStack>
          <HStack gap="16" justify="between">
            <Button theme={ButtonTheme.OUTLINE} onClick={onOpenArticle}>{t('Read more')}</Button>
            {views}
          </HStack>
        </Card>
      </li>
    );
  }

  return (
    <li
      data-testid="ArticlesItem"
      className={classNames(cl.ArticleItem, {}, [className, cl[view]])}
    >
      {blank ? (
        <Card className={cl.Card}>
          <time dateTime={article.createdAt} className={cl.CreatedAt}>
            {article.createdAt}
          </time>
          <AppLink
            className={cl.LinkImg}
            to={getRouteArticleDetails(article.id ?? '')}
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              className={cl.Img}
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <div className={cl.Content}>
            <div className={cl.Head}>
              {articleTypes}
              {views}
            </div>
            <AppLink
              className={cl.Link}
              to={getRouteArticleDetails(article.id ?? '')}
            >
              <Text tag="h2" cropped="1" size={TextSize.M} weight={TextWeight.BOLD}>
                {article.title}
              </Text>
            </AppLink>
          </div>
        </Card>
      ) : (
        <Card className={cl.Card}>
          <time dateTime={article.createdAt} className={cl.CreatedAt}>
            {article.createdAt}
          </time>
          <AppLink
            className={cl.LinkImg}
            to={getRouteArticleDetails(article.id ?? '')}
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              className={cl.Img}
              height={200}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          <div className={cl.Content}>
            <div className={cl.Head}>
              {articleTypes}
              {views}
            </div>
            <AppLink
              className={cl.Link}
              to={getRouteArticleDetails(article.id ?? '')}
            >
              <Text tag="h2" cropped="1" size={TextSize.M} weight={TextWeight.BOLD}>
                {article.title}
              </Text>
            </AppLink>
          </div>
        </Card>
      )}
    </li>
  );
});
