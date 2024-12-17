import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  TextSize, TextTheme, TextWeight, Text,
} from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/addNewComment';
import { Comments } from 'entitie/Comment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsError, getArticleCommentsIsloading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import cl from './ArticleDetailsPageComments.module.scss';

interface ArticleDetailsPageCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsPageComments = memo((props: ArticleDetailsPageCommentsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsloading = useSelector(getArticleCommentsIsloading);
  const commentsError = useSelector(getArticleCommentsError);
  const dispatch = useAppDispatch();

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  return (
    <div className={classNames('', {}, [className])}>
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
      />
    </div>
  );
});
