import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRole } from '@/entities/User';

import { Comments } from './Comments';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import avatar from '../CommentCard/avatar.jpg';

export default {
  title: 'entities/Comments',
  component: Comments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Comments>;

const Template: ComponentStory<typeof Comments> = (args) => (
  <Comments {...args} />
);

const baseArgs = {
  comments: [
    {
      id: '1',
      text: 'Привет! Это первый комментарий в ветке обсуждения.',
      user: {
        id: '1',
        username: 'Василий',
        email: 'vasya@test.com',
        roles: [UserRole.ADMIN],
        avatar,
      },
    },
    {
      id: '2',
      text: 'А это второй комментарий с более длинным текстом для того, чтобы проверить как работает '
        + 'перенос строк и отображение длинных сообщений в списке комментариев.',
      user: {
        id: '2',
        username: 'Петр',
        email: 'petr@test.com',
        roles: [UserRole.USER],
      },
    },
  ],
};

export const Normal = Template.bind({});
Normal.args = baseArgs;
Normal.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  comments: [],
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const Error = Template.bind({});
Error.args = {
  error: 'Произошла ошибка при загрузке комментариев',
};
Error.decorators = [StoreDecorator({})];

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {
  error: 'Произошла ошибка при загрузке комментариев',
};
ErrorRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
