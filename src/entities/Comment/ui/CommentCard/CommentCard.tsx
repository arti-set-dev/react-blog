import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text, TextSize, TextWeight } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { Comment } from '../../model/types/comments';
import cl from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  const { t } = useTranslation();

  if (!comment) {
    return null;
  }

  if (isLoading) {
    return (
      <li className={classNames(cl.CommentCard, {}, [className])}>
        <div className={cl.Header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton width="100%" height={20} />
        </div>
        <Skeleton width="100%" height={30} />
      </li>
    );
  }

  return (
    <li className={classNames(cl.CommentCard, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id)} className={cl.Header}>
        {comment.user.avatar
          && <Avatar alt={comment.user.username} size={30} src={comment.user.avatar} />}
        <Text size={TextSize.M} weight={TextWeight.BOLD}>{comment.user.username}</Text>
      </AppLink>
      <Text>{comment.text}</Text>
    </li>
  );
});
