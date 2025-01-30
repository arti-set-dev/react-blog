import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { List } from '@/shared/ui/deprecated/List';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comments';
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
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
          />
        ))}
      </List>
    );
  }

  if (isLoading) {
    content = (
      <VStack gap="16">
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </VStack>
    );
  }

  if (error) {
    content = <Text>{t('There was an error when downloading data')}</Text>;
  }

  return <div className={classNames('', {}, [className])}>{content}</div>;
});
