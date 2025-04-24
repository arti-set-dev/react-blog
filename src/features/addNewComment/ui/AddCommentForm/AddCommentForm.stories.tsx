import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { AddCommentForm } from './AddCommentForm';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/comments`,
        method: 'POST',
        status: 200,
        response: { id: '1', text: 'Текст комментария' },
      },
    ],
  },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => (
  <AddCommentForm {...args} />
);

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  onSendComment: () => {},
};
Normal.decorators = [
  StoreDecorator({
    addNewComment: {
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NormalEmpty = Template.bind({});
NormalEmpty.args = {
  onSendComment: () => {},
};
NormalEmpty.decorators = [
  StoreDecorator({
    addNewComment: {
      text: '',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NormalWithError = Template.bind({});
NormalWithError.args = {
  onSendComment: () => {},
};
NormalWithError.decorators = [
  StoreDecorator({
    addNewComment: {
      error: 'Ошибка',
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NotAuth = Template.bind({});
NotAuth.args = {
  onSendComment: () => {},
};
NotAuth.decorators = [
  StoreDecorator({
    addNewComment: {
      text: '',
    },
  }),
];

export const NormalDark = Template.bind({});
NormalDark.args = {
  onSendComment: () => {},
};
NormalDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    addNewComment: {
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  onSendComment: () => {},
};
NormalRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    addNewComment: {
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NormalEmptyRedesigned = Template.bind({});
NormalEmptyRedesigned.args = {
  onSendComment: () => {},
};
NormalEmptyRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    addNewComment: {
      text: '',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NormalWithErrorRedesigned = Template.bind({});
NormalWithErrorRedesigned.args = {
  onSendComment: () => {},
};
NormalWithErrorRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    addNewComment: {
      error: 'Ошибка',
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];

export const NotAuthRedesigned = Template.bind({});
NotAuthRedesigned.args = {
  onSendComment: () => {},
};
NotAuthRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    addNewComment: {
      text: '',
    },
  }),
];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  onSendComment: () => {},
};
NormalDarkRedesigned.decorators = [
  NewDesignDecorator,
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    addNewComment: {
      text: 'Текст комментария',
    },
    user: {
      authData: { id: '1', username: 'user' },
    },
  }),
];
