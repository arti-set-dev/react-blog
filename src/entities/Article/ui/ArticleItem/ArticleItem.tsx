import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import ViewsIcon from '@/shared/assets/icons/eye-icon.svg';
import { Text, TextSize, TextWeight } from '@/shared/ui/Text/Text';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Card } from '@/shared/ui/Card/Card';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { ArticleView } from '../../model/consts/consts';
import { ArticleBlockType } from '../../model/types/articleType';
import {
  Article, ArticleTextBlock,
} from '../../model/types/article';
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
    navigate(RoutePath.articles_details + article.id);
  }, [article.id, navigate]);

  const articleTypes = useMemo(() => (
    <div className={cl.Tags}>
      {article.type.map(((type, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} className={cl.Tag}>{type}</Text>
      )))}
    </div>
  ), [article.type]);

  const views = (
    <div className={cl.Views}>
      {article.views}
      <ViewsIcon />
    </div>
  );

  if (view === ArticleView.COLUMN) {
    const textBlocks = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <li className={classNames(cl.ArticleItem, {}, [className, cl[view]])}>
        <Card className={cl.Card}>
          <div className={cl.Header}>
            <Avatar className={cl.Avatar} size={30} src={article.user.avatar} alt={article.user.username} />
            <Text className={cl.Username} size={TextSize.M} weight={TextWeight.BOLD}>{article.user.username}</Text>
            <Text size={TextSize.S}>{article.createdAt}</Text>
          </div>
          <AppLink to={`${RoutePath.articles}/${article.id}`}>
            <Text className={cl.Title} size={TextSize.XL}>{article.title}</Text>
          </AppLink>
          {articleTypes}
          <AppLink className={cl.LinkImg} to={`${RoutePath.articles}/${article.id}`}>
            <img height={300} className={cl.Img} src={article.img} alt={article.title} />
          </AppLink>
          {textBlocks && (
            <ArticleTextBlockComponent className={cl.TextBlock} block={textBlocks} />
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
    <li className={classNames(cl.ArticleItem, {}, [className, cl[view]])}>
      {blank
        ? (
          <Card className={cl.Card}>
            <time dateTime={article.createdAt} className={cl.CreatedAt}>{article.createdAt}</time>
            <AppLink to={`${RoutePath.articles}/${article.id}`} target="_blank">
              <img className={cl.Img} height={200} src={article.img} alt={article.title} />
            </AppLink>
            <div className={cl.Content}>
              <div className={cl.Head}>
                {articleTypes}
                {views}
              </div>
              <AppLink className={cl.Link} to={`${RoutePath.articles}/${article.id}`} target="_blank">
                <Text size={TextSize.M} weight={TextWeight.BOLD}>{article.title}</Text>
              </AppLink>
            </div>
          </Card>
        )
        : (
          <Card className={cl.Card}>
            <time dateTime={article.createdAt} className={cl.CreatedAt}>{article.createdAt}</time>
            <AppLink to={`${RoutePath.articles}/${article.id}`}>
              <img className={cl.Img} height={200} src={article.img} alt={article.title} />
            </AppLink>
            <div className={cl.Content}>
              <div className={cl.Head}>
                {articleTypes}
                {views}
              </div>
              <AppLink className={cl.Link} to={`${RoutePath.articles}/${article.id}`}>
                <Text size={TextSize.M} weight={TextWeight.BOLD}>{article.title}</Text>
              </AppLink>
            </div>
          </Card>
        )}

    </li>
  );
});
