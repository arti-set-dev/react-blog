import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationButton } from './NotificationButton';

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];

export const ShowNotification = Template.bind({});
ShowNotification.args = {};
ShowNotification.decorators = [StoreDecorator({

})];
ShowNotification.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Notice',
          description: 'Leave a comment',
        },
        {
          id: '2',
          title: 'Уведомление 2',
          description: 'Leave a comment',
        },
        {
          id: '3',
          title: 'Уведомление 3',
          description: 'Leave a comment',
        },
      ],
    },
  ],
};
