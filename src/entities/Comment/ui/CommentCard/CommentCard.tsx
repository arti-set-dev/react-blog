import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { ToggleFeatures } from '@/shared/lib/features';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated, TextSize, TextWeight } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <Card
            tag="div"
            offset="16"
            data-testid="CommentCard.Loading"
            className={getVstack({ gap: 16 })}
          >
            <HStack gap="16">
              <Skeleton width={30} height={30} border="50%" />
              <Skeleton width="100%" height={20} />
            </HStack>
          </Card>
        )}
        off={(
          <li
            data-testid="CommentCard.Loading"
            className={classNames(cl.CommentCard, {}, [className])}
          >
            <div className={cl.Header}>
              <SkeletonDeprecated width={30} height={30} border="50%" />
              <SkeletonDeprecated width="100%" height={20} />
            </div>
            <SkeletonDeprecated width="100%" height={30} />
          </li>
        )}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card
          tag="li"
          data-testid="CommentCard.Content"
          offset="24"
          max
        >
          <AppLink to={getRouteProfile(comment.user.id)} className={cl.Header}>
            {comment.user.avatar && (
              <Avatar
                alt={comment.user.username}
                size={30}
                src={comment.user.avatar}
              />
            )}
            <Text size="m" weight="bold">
              {comment.user.username}
            </Text>
          </AppLink>
          <Text>{comment.text}</Text>
        </Card>
      )}
      off={(
        <li
          data-testid="CommentCard.Content"
          className={classNames(cl.CommentCard, {}, [className])}
        >
          <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cl.Header}>
            {comment.user.avatar && (
              <AvatarDeprecated
                alt={comment.user.username}
                size={30}
                src={comment.user.avatar}
              />
            )}
            <TextDeprecated size={TextSize.M} weight={TextWeight.BOLD}>
              {comment.user.username}
            </TextDeprecated>
          </AppLinkDeprecated>
          <TextDeprecated>{comment.text}</TextDeprecated>
        </li>
      )}
    />
  );
});
