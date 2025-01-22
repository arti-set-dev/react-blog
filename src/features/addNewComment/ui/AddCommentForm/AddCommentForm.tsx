import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text, TextTheme } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';
import { getCommentFormError, getCommentFormText } from '../../model/selectors/addNewCommentSelectors';
import cl from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getCommentFormText);
  const error = useSelector(getCommentFormError);
  const dispatch = useAppDispatch();

  const reducers: ReducerList = {
    addNewComment: addNewCommentReducer,
  };

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addNewCommentActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <form data-testid="AddCommentForm" className={classNames(cl.AddCommentForm, {}, [className])}>
        <Input
          data-testid="AddCommentForm.Input"
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('Write your comment')}
        />
        {error
          && (
            <VStack gap="8">
              <Input value={text} onChange={onCommentTextChange} placeholder={t('Write your comment')} />
              <Text theme={TextTheme.ERROR}>{t('There was an error when sending a message')}</Text>
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
    </DynamicModuleLoader>
  );
});
