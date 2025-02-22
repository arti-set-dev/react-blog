import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Comment } from '../../model/types/comments';
import cl from './Comments.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

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
      <VStack tag="ul" max className={cl.List}>
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
          <Card
            offset="16"
            data-testid="CommentCard.Loading"
            className={getVstack({ gap: 16 })}
            max
          >
            <HStack gap="16">
              <Skeleton width={30} height={30} border="circle" />
              <Skeleton width={200} height={20} />
            </HStack>
            <Skeleton width="100%" height={20} />
          </Card>
        )}
        off={(
          <VStack gap="16" max>
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
