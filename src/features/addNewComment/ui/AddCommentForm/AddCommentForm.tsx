import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddCommentFormRedesigned,
} from './AddCommentFormRedesigned/AddCommentFormRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AddCommentFormDeprecated,
} from './AddCommentFormDeprecated/AddCommentFormDeprecated';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();

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
