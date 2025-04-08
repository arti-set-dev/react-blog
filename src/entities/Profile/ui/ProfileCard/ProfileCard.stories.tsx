import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});

const primaryArgs = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Germany,
    city: 'New York',
    currency: Currency.EUR,
    firstname: 'Firstname',
    lastname: 'Lastname',
    avatar:
      // eslint-disable-next-line max-len
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
};

Primary.args = primaryArgs;
Primary.decorators = [StoreDecorator({})];

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};
withError.decorators = [StoreDecorator({})];

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
