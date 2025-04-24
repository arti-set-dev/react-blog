import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddCommentFormProps } from '../AddCommentForm';
import { getCommentFormError, getCommentFormText } from '../../../model/selectors/addNewCommentSelectors';
import { addNewCommentActions } from '../../../model/slices/addNewCommentSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import {
  Text, TextSize, TextTheme,
} from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './AddCommentFormDeprecated.module.scss';
import { getUserAuthData } from '@/entities/User';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const AddCommentFormDeprecated = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation('article-details');
  const text = useSelector(getCommentFormText);
  const error = useSelector(getCommentFormError);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  if (!authData) {
    return (
      <form
        data-testid="AddCommentForm"
        className={classNames(cl.AddCommentFormDeprecated, {}, [className])}
      >
        <Text size={TextSize.L}>{t('Login to our platform and join in the lively discussions')}</Text>
      </form>
    );
  }

  return (
    <form
      data-testid="AddCommentForm"
      className={classNames(cl.AddCommentFormDeprecated, {}, [className])}
    >
      <VStack gap="16" fullWidth>
        <Input
          data-testid="AddCommentForm.Input"
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('Write your comment')}
        />
        {error && (
          <Text theme={TextTheme.ERROR}>
            {t('There was an error when sending a message')}
          </Text>
        )}
      </VStack>
      <Button
        data-testid="AddCommentForm.Button"
        onClick={onSendHandler}
        theme={ButtonTheme.OUTLINE}
      >
        {t('Send')}
      </Button>
    </form>
  );
});
