import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
  TextSize, TextTheme, TextWeight, Text,
} from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AddCommentForm } from '@/features/addNewComment';
import { Comments } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
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

interface ArticleDetailsPageCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsPageComments = memo(
  (props: ArticleDetailsPageCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsloading = useSelector(getArticleCommentsIsloading);
    const commentsError = useSelector(getArticleCommentsError);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    });

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
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Text
          className={cl.Title}
          theme={TextTheme.PRIMARY}
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          {t('Comments')}
        </Text>
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
