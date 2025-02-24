import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
  TextSize, TextTheme, TextWeight, Text as TextDeprecated,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm } from '@/features/addNewComment';
import { Comments } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  getArticleCommentsError,
  getArticleCommentsIsloading,
} from '../../model/selectors/comments';
import { articleDetailsCommentsActions, getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import cl from './ArticleDetailsPageComments.module.scss';
import { deleteCommentForArticle } from '../../model/services/deleteCommentForArticle/deleteCommentForArticle';
import { updateCommentForArticle } from '../../model/services/updateCommentForArticle/updateCommentForArticle';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsPageCommentsProps {
  className?: string;
  id?: string;
}

const isReducerMounted = (state: StateSchema) => Boolean(state.articleDetailsPage);

export const ArticleDetailsPageComments = memo(
  (props: ArticleDetailsPageCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsloading = useSelector(getArticleCommentsIsloading);
    const commentsError = useSelector(getArticleCommentsError);
    const dispatch = useAppDispatch();
    const isMounted = useSelector(isReducerMounted);

    useEffect(() => {
      if (id && isMounted) {
        dispatch(fetchCommentsByArticleId(id));
      }
    }, [dispatch, id, isMounted]);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    const onDeleteComment = useCallback(
      (commentId: string) => {
        dispatch(deleteCommentForArticle(commentId));
        dispatch(fetchCommentsByArticleId(id));
      },
      [dispatch, id],
    );

    const onEditComment = useCallback(
      (commentId: string, text: string) => {
        dispatch(articleDetailsCommentsActions.updateComment({ id: commentId, text }));
        dispatch(updateCommentForArticle({ commentId, text }));
        dispatch(fetchCommentsByArticleId(id));
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
