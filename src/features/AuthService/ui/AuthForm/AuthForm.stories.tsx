import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AuthForm from './AuthForm';

export default {
  title: 'features/AuthForm',
  component: AuthForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <AuthForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { username: '123', password: 'asd' },
  }),
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
  StoreDecorator({
    loginForm: { username: '123', password: 'asd', error: 'ERROR' },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true },
  }),
];
