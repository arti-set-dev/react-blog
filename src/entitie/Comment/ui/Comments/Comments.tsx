import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { Comment } from 'entitie/Comment';
import { List } from 'shared/ui/List/List';
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
          <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
        ))}
      </List>
    );
  } else if (error) {
    content = (
      <Text>{t('There was an error when downloading data')}</Text>
    );
  } else {
    content = (
      <Text>{t('There are no comments')}</Text>
    );
  }

  return (
    <div className={classNames(cl.Comments, {}, [className])}>
      <Text
        className={cl.Title}
        theme={TextTheme.PRIMARY}
        weight={TextWeight.BOLD}
        size={TextSize.XL}
      >
        {t('Comments')}
      </Text>
      {content}
    </div>
  );
});
