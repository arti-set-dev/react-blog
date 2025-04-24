import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainHero } from './MainHero';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'widgets/Hero/MainHero',
  component: MainHero,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    loki: {
      skip: true,
    },
  },
} as ComponentMeta<typeof MainHero>;

const Template: ComponentStory<typeof MainHero> = (args) => <MainHero {...args} />;

// Для неавторизованных пользователей
export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = {};
NotAuthenticated.decorators = [
  StoreDecorator({
    user: {},
  }),
];

// Для авторизованных пользователей
export const Authenticated = Template.bind({});
Authenticated.args = {};
Authenticated.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  }),
];

// Для неавторизованных пользователей в редизайн версии
export const NotAuthenticatedRedesigned = Template.bind({});
NotAuthenticatedRedesigned.args = {};
NotAuthenticatedRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {},
  }),
];

// Для авторизованных пользователей в редизайн версии
export const AuthenticatedRedesigned = Template.bind({});
AuthenticatedRedesigned.args = {};
AuthenticatedRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  }),
];
