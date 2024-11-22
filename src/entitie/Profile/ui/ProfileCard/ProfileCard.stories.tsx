import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entitie/Country';
import { Currency } from 'entitie/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entitie/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Germany,
    city: 'New York',
    currency: Currency.EUR,
    firstname: 'Firstname',
    lastname: 'Lastname',
    avatar,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
