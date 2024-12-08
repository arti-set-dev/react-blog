import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import ViewsIcon from 'shared/assets/icons/eye-icon.svg';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Skeleton, SkeletonAlign } from 'shared/ui/Skeleton/Skeleton';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cl from './ArticleItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleItemSkeleton = memo((props: ArticleItemSkeletonProps) => {
  const { className, view } = props;

  if (view === ArticleView.COLUMN) {
    return (
      <li className={classNames('', {}, [className, cl[view]])}>
        <Card className={classNames(cl.Card, {}, [className])}>
          <div className={cl.Header}>
            <Skeleton align={SkeletonAlign.DEFAULT} className={cl.Avatar} width={30} height={30} border="50%" />
            <Skeleton align={SkeletonAlign.DEFAULT} className={cl.Username} width={100} height={16} />
            <Skeleton align={SkeletonAlign.DEFAULT} width={100} height={16} />
          </div>
          <Skeleton width="100%" height={16} />
          <Skeleton className={cl.LinkImg} width="100%" height={300} />
          <div className={cl.Footer}>
            <Skeleton align={SkeletonAlign.DEFAULT} width={100} height={16} />
            <Skeleton align={SkeletonAlign.DEFAULT} width={100} height={16} />
          </div>
        </Card>
      </li>
    );
  }

  return (
    <li className={classNames('', {}, [className, cl[view]])}>
      <Card className={classNames(cl.Card, {}, [className])}>
        <Skeleton width="100%" height="200px" />
        <div className={cl.Content}>
          <div className={cl.Head}>
            <Skeleton align={SkeletonAlign.DEFAULT} width="100px" height="16px" />
            <Skeleton align={SkeletonAlign.DEFAULT} width="100px" height="16px" />
          </div>
          <Skeleton width="100%" height="16px" />
        </div>
      </Card>
    </li>
  );
});
