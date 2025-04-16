import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
  TextSize, TextTheme, TextWeight, Text as TextDeprecated,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm } from '@/features/addNewComment';
import {
  Comments,
  fetchComments,
  addComment,
  deleteComment,
  updateComment,
  commentsActions, getArticleComments,
} from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getCommentsError,
  getCommentsIsloading,
} from '../../../../entities/Comment/model/selectors/comments';
import cl from './ArticleDetailsPageComments.module.scss';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsPageCommentsProps {
  className?: string;
  id?: string;
}

const isReducerMounted = (state: StateSchema) => Boolean(state.comments);

export const ArticleDetailsPageComments = memo(
  (props: ArticleDetailsPageCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article-details');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsloading = useSelector(getCommentsIsloading);
    const commentsError = useSelector(getCommentsError);
    const dispatch = useAppDispatch();
    const isMounted = useSelector(isReducerMounted);

    useEffect(() => {
      if (id && isMounted) {
        dispatch(fetchComments(id));
      }
    }, [dispatch, id, isMounted]);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addComment(text));
      },
      [dispatch],
    );

    const onDeleteComment = useCallback(
      (commentId: string) => {
        dispatch(deleteComment(commentId));
        dispatch(fetchComments(id));
      },
      [dispatch, id],
    );

    const onEditComment = useCallback(
      (commentId: string, text: string) => {
        dispatch(commentsActions.updateComment({ id: commentId, text }));
        dispatch(updateComment({ commentId, text }));
        dispatch(fetchComments(id));
      },
      [dispatch, id],
    );

    return (
      <VStack gap="16" fullWidth>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={(
            <Text
              variant="primary"
              weight="bold"
              size="xl"
            >
              {t('Comments')}
            </Text>
          )}
          off={(
            <TextDeprecated
              className={cl.Title}
              theme={TextTheme.PRIMARY}
              weight={TextWeight.BOLD}
              size={TextSize.XL}
            >
              {t('Comments')}
            </TextDeprecated>
          )}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <Comments
          error={commentsError}
          isLoading={commentsIsloading}
          comments={comments}
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment}
        />
      </VStack>
    );
  },
);
