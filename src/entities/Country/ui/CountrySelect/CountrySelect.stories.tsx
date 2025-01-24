import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    CountrySelect: 'CountrySelect',
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
  <CountrySelect {...args} />
);

export const CountrySelectDefault = Template.bind({});
CountrySelectDefault.args = {};

export const CountrySelectDefaultDark = Template.bind({});
CountrySelectDefaultDark.args = {};
CountrySelectDefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
