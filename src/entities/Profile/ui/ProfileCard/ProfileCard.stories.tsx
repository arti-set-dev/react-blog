import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from './avatar.jpg';

export default {
  title: 'entities/Profile/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const profile = {
  id: '1',
  firstname: 'Иван',
  lastname: 'Иванов',
  age: 25,
  currency: Currency.USD,
  country: Country.USA,
  city: 'Москва',
  username: 'ivan123',
  avatar,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const Error = Template.bind({});
Error.args = {
  error: 'Ошибка загрузки профиля',
};
Error.decorators = [StoreDecorator({})];

export const Editable = Template.bind({});
Editable.args = {
  data: profile,
  readonly: false,
};
Editable.decorators = [StoreDecorator({})];

export const WithErrors = Template.bind({});
WithErrors.args = {
  data: profile,
  readonly: false,
  fieldErrors: {
    firstname: 'Имя обязательно',
    age: 'Некорректный возраст',
  },
};
WithErrors.decorators = [StoreDecorator({})];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {
  error: 'Ошибка загрузки профиля',
};
ErrorRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const EditableRedesigned = Template.bind({});
EditableRedesigned.args = {
  data: profile,
  readonly: false,
};
EditableRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithErrorsRedesigned = Template.bind({});
WithErrorsRedesigned.args = {
  data: profile,
  readonly: false,
  fieldErrors: {
    firstname: 'Имя обязательно',
    age: 'Некорректный возраст',
  },
};
WithErrorsRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
