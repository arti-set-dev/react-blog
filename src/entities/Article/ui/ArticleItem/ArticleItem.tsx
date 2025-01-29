import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { LazyImage } from '@/shared/ui/deprecated/LazyImage';
import { Text, TextSize, TextWeight } from '@/shared/ui/deprecated/Text';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { ArticleView } from '../../model/consts/consts';
import { ArticleBlockType } from '../../model/types/articleType';
import { Article, ArticleTextBlock } from '../../model/types/article';
import cl from './ArticleItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  blank?: boolean;
}

export const ArticleItem = memo((props: ArticleItemProps) => {
  const {
    className, article, view, blank,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(getRouteArticleDetails(article.id));
  }, [article.id, navigate]);

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
        <Card isHovered className={cl.Card}>
          <div className={cl.Header}>
            <Avatar
              className={cl.Avatar}
              size={30}
              src={article.user.avatar}
              alt={article.user.username}
            />
            <Text
              className={cl.Username}
              size={TextSize.M}
              weight={TextWeight.BOLD}
            >
              {article.user.username}
            </Text>
            <Text size={TextSize.S}>{article.createdAt}</Text>
          </div>
          <AppLink to={getRouteArticleDetails(article.id)}>
            <Text className={cl.Title} size={TextSize.XL}>
              {article.title}
            </Text>
          </AppLink>
          {articleTypes}
          <AppLink
            className={cl.LinkImg}
            to={getRouteArticleDetails(article.id)}
          >
            <LazyImage
              height={300}
              className={cl.Img}
              src={article.img}
              alt={article.title}
            />
          </AppLink>
          {textBlocks && (
            <ArticleTextBlockComponent
              className={cl.TextBlock}
              block={textBlocks}
            />
          )}
          <div onClick={onOpenArticle} className={cl.Footer}>
            <Button theme={ButtonTheme.OUTLINE}>{t('Read more')}</Button>
            {views}
          </div>
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
        <Card isHovered className={cl.Card}>
          <time dateTime={article.createdAt} className={cl.CreatedAt}>
            {article.createdAt}
          </time>
          <AppLink
            className={cl.LinkImg}
            to={getRouteArticleDetails(article.id)}
            target="_blank"
          >
            <LazyImage
              fallback={<Skeleton width="100%" height={200} />}
              className={cl.Img}
              width={280}
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
              to={getRouteArticleDetails(article.id)}
              target="_blank"
            >
              <Text size={TextSize.M} weight={TextWeight.BOLD}>
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
            to={getRouteArticleDetails(article.id)}
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
              to={getRouteArticleDetails(article.id)}
            >
              <Text size={TextSize.M} weight={TextWeight.BOLD}>
                {article.title}
              </Text>
            </AppLink>
          </div>
        </Card>
      )}
    </li>
  );
});
