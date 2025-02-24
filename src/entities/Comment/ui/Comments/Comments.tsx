import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Comment } from '../../model/types/comments';
import cl from './Comments.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentsSkeleton } from './CommentsSkeleton';

interface CommentsProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
  error?: string;
  onDeleteComment?: (commentId: string) => void;
  onEditComment?: (commentId: string, text: string) => void;
}

export const Comments = memo((props: CommentsProps) => {
  const {
    className, comments, isLoading, error, onDeleteComment, onEditComment,
  } = props;
  const { t } = useTranslation('article-details');

  let content;

  if (comments?.length) {
    content = (
      <VStack tag="ul" fullWidth className={cl.List}>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        ))}
      </VStack>
    );
  }

  if (isLoading) {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <CommentsSkeleton />
        )}
        off={(
          <VStack gap="16" fullWidth>
            <SkeletonDeprecated width="100%" height={40} />
            <SkeletonDeprecated width="100%" height={40} />
            <SkeletonDeprecated width="100%" height={40} />
          </VStack>
        )}
      />
    );
  }

  if (error) {
    content = <Text>{t('There was an error when downloading data')}</Text>;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {content}
    </>
  );
});
