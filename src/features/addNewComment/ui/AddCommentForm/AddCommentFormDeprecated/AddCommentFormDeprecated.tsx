import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddCommentFormProps } from '../AddCommentForm';
import { getCommentFormError, getCommentFormText } from '../../../model/selectors/addNewCommentSelectors';
import { addNewCommentActions } from '../../../model/slices/addNewCommentSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/deprecated/Input';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './AddCommentFormDeprecated.module.scss';

export const AddCommentFormDeprecated = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getCommentFormText);
  const error = useSelector(getCommentFormError);
  const dispatch = useAppDispatch();

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

  return (
    <form
      data-testid="AddCommentForm"
      className={classNames(cl.AddCommentFormDeprecated, {}, [className])}
    >
      <Input
        data-testid="AddCommentForm.Input"
        value={text}
        onChange={onCommentTextChange}
        placeholder={t('Write your comment')}
      />
      {error && (
        <VStack gap="8">
          <Input
            value={text}
            onChange={onCommentTextChange}
            placeholder={t('Write your comment')}
          />
          <Text theme={TextTheme.ERROR}>
            {t('There was an error when sending a message')}
          </Text>
        </VStack>
      )}
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
