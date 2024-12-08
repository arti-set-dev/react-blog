import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slices/addNewCommentSlice';
import { getCommentFormError, getCommentFormText } from '../../model/selectors/addNewCommentSelectors';
import cl from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
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
      <form className={classNames(cl.AddCommentForm, {}, [className])}>
        <Input value={text} onChange={onCommentTextChange} placeholder={t('Write your comment')} />
        {error
          && (
            <div className={cl.errorWrapper}>
              <Input value={text} onChange={onCommentTextChange} placeholder={t('Write your comment')} />
              <Text theme={TextTheme.ERROR}>{t('There was an error when sending a message')}</Text>
            </div>
          )}
        <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>{t('Send')}</Button>
      </form>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
