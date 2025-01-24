import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserRole } from '@/entities/User';
import { CommentCard } from './CommentCard';
import avatarImage from './avatar.jpg';

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', roles: [UserRole.ADMIN] },
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
      avatar: avatarImage,
      roles: [UserRole.ADMIN],
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya', roles: [UserRole.ADMIN] },
  },
  isLoading: true,
};
