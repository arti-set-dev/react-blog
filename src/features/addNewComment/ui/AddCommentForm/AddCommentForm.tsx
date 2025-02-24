import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AddCommentFormRedesigned,
} from './AddCommentFormRedesigned/AddCommentFormRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AddCommentFormDeprecated,
} from './AddCommentFormDeprecated/AddCommentFormDeprecated';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import {
  getCommentFormError,
  getCommentFormText,
} from '../../model/selectors/addNewCommentSelectors';

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

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<AddCommentFormRedesigned onSendComment={onSendComment} />}
        off={<AddCommentFormDeprecated onSendComment={onSendComment} />}
      />
    </DynamicModuleLoader>
  );
});
