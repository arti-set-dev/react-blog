import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { getCommentFormError, getCommentFormText } from '../../../model/selectors/addNewCommentSelectors';
import { addNewCommentActions } from '../../../model/slices/addNewCommentSlice';
import { AddCommentFormProps } from '../AddCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import SendIcon from '@/shared/assets/icons/send-icon.svg';

export const AddCommentFormRedesigned = memo((props: AddCommentFormProps) => {
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
    <Card
      tag="form"
      offset="24"
      data-testid="AddCommentForm"
      max
      className={getHstack({ gap: 24, align: 'center' })}
    >
      <Input
        data-testid="AddCommentForm.Input"
        variant="outlined"
        background="light"
        value={text}
        onChange={onCommentTextChange}
        placeholder={t('Write your comment')}
      />
      {error && (
        <VStack gap="8">
          <Input
            variant="outlined"
            value={text}
            onChange={onCommentTextChange}
            placeholder={t('Write your comment')}
          />
          <Text variant="error">
            {t('There was an error when sending a message')}
          </Text>
        </VStack>
      )}
      <Button
        data-testid="AddCommentForm.Button"
        onClick={onSendHandler}
        variant="icon"
      >
        <Icon Svg={SendIcon} />
        {t('Send')}
      </Button>
    </Card>
  );
});
