import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { authReducer } from '@/features/AuthService/testing';
import { profileReducer } from '@/features/editableProfileCard/testing';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsReducer,
} from '@/entities/Article/testing';
import { addNewCommentReducer } from '@/features/addNewComment/testing';
import { commentsReducer }
  from '@/entities/Comment/testing';

const defaultAsyncReducers: ReducerList = {
  loginForm: authReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  comments: commentsReducer,
};

export const
  StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: Story) => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  );
