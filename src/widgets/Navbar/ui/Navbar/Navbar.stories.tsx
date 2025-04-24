import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from './Navbar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import avatar from './storybook.jpg';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

// Неавторизованный пользователь (стандартный дизайн)
export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = {};
NotAuthenticated.decorators = [
  StoreDecorator({
    user: {},
  }),
];

// Авторизованный пользователь (стандартный дизайн)
export const Authenticated = Template.bind({});
Authenticated.args = {};
Authenticated.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
        avatar,
      },
    },
  }),
];

// Неавторизованный пользователь (редизайн)
export const NotAuthenticatedRedesigned = Template.bind({});
NotAuthenticatedRedesigned.args = {};
NotAuthenticatedRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {},
  }),
];

// Авторизованный пользователь (редизайн)
export const AuthenticatedRedesigned = Template.bind({});
AuthenticatedRedesigned.args = {};
AuthenticatedRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
        avatar,
      },
    },
  }),
];
