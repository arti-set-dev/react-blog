import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { CommentCard } from './CommentCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import avatar from './avatar.jpg';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const normalArgs = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', email: 'test@test.com' },
  },
};

const commentWithAvatar = {
  comment: {
    id: '1',
    text: 'Комментарий с аватаром пользователя',
    user: {
      id: '1',
      username: 'Vasya',
      email: 'test@test.com',
      avatar,
    },
  },
};

const userStateWithAuth = {
  user: {
    authData: {
      id: '1',
      username: 'Vasya',
    },
  },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;
Normal.decorators = [StoreDecorator({})];

export const WithAvatarRedesigned = Template.bind({});
WithAvatarRedesigned.args = commentWithAvatar;
WithAvatarRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const Editable = Template.bind({});
Editable.args = {
  ...normalArgs,
  onEditComment: action('onEditComment'),
  onDeleteComment: action('onDeleteComment'),
};
Editable.decorators = [StoreDecorator(userStateWithAuth)];

export const EditableRedesigned = Template.bind({});
EditableRedesigned.args = {
  ...normalArgs,
  onEditComment: action('onEditComment'),
  onDeleteComment: action('onDeleteComment'),
};
EditableRedesigned.decorators = [NewDesignDecorator, StoreDecorator(userStateWithAuth)];

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', email: 'test@test.com' },
  },
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', email: 'test@test.com' },
  },
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
