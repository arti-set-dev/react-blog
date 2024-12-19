import { UserRole } from 'entitie/User';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Comments } from './Comments';

export default {
  title: 'entitie/Comments',
  component: Comments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Comments>;

const Template: ComponentStory<typeof Comments> = (args) => <Comments {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Vasya', roles: [UserRole.ADMIN] },
    },
    {
      id: '2',
      text: 'Comment 2',
      user: { id: '1', username: 'Petya', roles: [UserRole.ADMIN] },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
