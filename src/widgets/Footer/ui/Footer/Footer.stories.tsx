import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from './Footer';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'widgets/Footer',
  component: Footer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({
  user: {},
})];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {};
DefaultRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {},
  }),
];

export const Authenticated = Template.bind({});
Authenticated.args = {};
Authenticated.decorators = [StoreDecorator({
  user: {
    authData: {
      id: '1',
      username: 'admin',
    },
  },
})];

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
