import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  notification: {
    id: '1',
    title: 'Notice',
    description: 'Leave a comment',
    href: 'link',
  },
};

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  notification: {
    id: '1',
    title: 'Notice',
    description: 'Leave a comment',
  },
};
