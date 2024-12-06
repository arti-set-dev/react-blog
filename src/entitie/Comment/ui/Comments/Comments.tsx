import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { Comment } from 'entitie/Comment';
import { List } from 'shared/ui/List/List';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cl from './Comments.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentsProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
    error?: string;
}

export const Comments = memo((props: CommentsProps) => {
  const {
    className, comments, isLoading, error,
  } = props;
  const { t } = useTranslation('article-details');

  let content;

  if (comments?.length) {
    content = (
      <List className={cl.List}>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
        ))}
      </List>
    );
  }

  if (isLoading) {
    content = (
      <div className={cl.List}>
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </div>
    );
  }

  if (error) {
    content = (
      <Text>{t('There was an error when downloading data')}</Text>
    );
  }

  return (
    <div className={classNames('', {}, [className])}>
      {content}
    </div>
  );
});
