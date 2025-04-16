import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { ToggleFeatures } from '@/shared/lib/features';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
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
import { getUserAuthData } from '@/entities/User';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
  onDeleteComment?: (commentId: string) => void;
  onEditComment?: (commentId: string, text: string) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const {
    className, comment, isLoading, onDeleteComment, onEditComment,
  } = props;
  const { t } = useTranslation('article-details');
  const authData = useSelector(getUserAuthData);
  const canEdit = authData?.id === comment?.user?.id;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(comment?.text || '');

  const onDisabledHandler = () => {
    if (editedText === '') {
      return true;
    }
    return false;
  };

  const onSaveHandler = () => {
    onEditComment?.(comment.id, editedText);

    setIsEditing(false);
  };

  const onChangeHandler = (value: string) => {
    setEditedText(value);
  };

  const editControls = (
    isEditing ? (
      <HStack gap="8">
        <Button variant="outline" onClick={onSaveHandler} disabled={onDisabledHandler()}>{t('Save')}</Button>
        <Button variant="outline" onClick={() => setIsEditing(false)}>{t('Cancel')}</Button>
      </HStack>
    ) : (
      <HStack gap="8">
        <Button variant="outline" onClick={() => setIsEditing(true)}>{t('Edit')}</Button>
        <Button variant="outline-red" onClick={() => onDeleteComment?.(comment.id)}>{t('Delete')}</Button>
      </HStack>
    )
  );

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
              <Skeleton width={30} height={30} border="circle" />
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
          className={getVstack({ gap: 16 })}
        >
          <HStack justify="between" align="center">
            <AppLink to={getRouteProfile(comment?.user?.id ?? '')} className={getHstack({ gap: 8, align: 'center' })}>
              {comment?.user?.avatar && (
                <Avatar
                  alt={comment?.user?.username}
                  size={30}
                  src={comment?.user?.avatar}
                />
              )}
              <Text size="m" weight="bold">
                {comment?.user?.username}
              </Text>
            </AppLink>
            {canEdit && editControls}
          </HStack>
          {isEditing ? (
            <Input
              value={editedText}
              onChange={onChangeHandler}
              variant="lined"
            />
          ) : (
            <Text>{comment.text}</Text>
          )}
        </Card>

      )}
      off={(
        <li
          data-testid="CommentCard.Content"
          className={classNames(cl.CommentCard, {}, [className])}
        >
          <HStack gap="8" align="center" className={cl.Header}>
            <AppLinkDeprecated
              to={getRouteProfile(comment?.user?.id ?? '')}
              className={getHstack({ gap: 8, align: 'center' })}
            >
              {comment?.user?.avatar && (
                <AvatarDeprecated
                  alt={comment?.user?.username}
                  size={30}
                  src={comment?.user?.avatar}
                />
              )}
              <TextDeprecated size={TextSize.M} weight={TextWeight.BOLD}>
                {comment?.user?.username}
              </TextDeprecated>
            </AppLinkDeprecated>
            {canEdit && editControls}
          </HStack>
          {isEditing ? (
            <Input
              value={editedText}
              onChange={onChangeHandler}
              variant="lined"
            />
          ) : (
            <TextDeprecated>{comment.text}</TextDeprecated>
          )}
        </li>
      )}
    />
  );
});
