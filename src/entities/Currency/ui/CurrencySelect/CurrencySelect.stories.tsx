import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CurrencySelect } from './CurrencySelect';

export default {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    CurrencySelect: 'CurrencySelect',
  },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const CurrencySelectDefault = Template.bind({});
CurrencySelectDefault.args = {};

export const CurrencySelectDefaultDark = Template.bind({});
CurrencySelectDefaultDark.args = {};
CurrencySelectDefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
