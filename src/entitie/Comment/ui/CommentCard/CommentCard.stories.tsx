/* eslint-disable max-len */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
  title: 'entitie/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya' },
  },
};

export const Avatar = Template.bind({});
Avatar.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: {
      id: '1',
      username: 'Vasya',
      avatar: 'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya' },
  },
  isLoading: true,
};
