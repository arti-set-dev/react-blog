import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CurrencySelect } from './CurrencySelect';
import { Currency } from '../../model/types/currency';

export default {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
  <CurrencySelect {...args} />
);

// Старый дизайн (deprecated)
export const Default = Template.bind({});
Default.args = {
  currValue: Currency.EUR,
};
Default.decorators = [StoreDecorator({})];

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  currValue: Currency.EUR,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Readonly = Template.bind({});
Readonly.args = {
  currValue: Currency.USD,
  readonly: true,
};
Readonly.decorators = [StoreDecorator({})];

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {
  currValue: Currency.USD,
  readonly: true,
};
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
  currValue: Currency.EUR,
};
DefaultRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const DefaultDarkRedesigned = Template.bind({});
DefaultDarkRedesigned.args = {
  currValue: Currency.EUR,
};
DefaultDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const LightBackground = Template.bind({});
LightBackground.args = {
  currValue: Currency.KZT,
  background: 'light',
};
LightBackground.decorators = [NewDesignDecorator, StoreDecorator({})];

export const DarkBackground = Template.bind({});
DarkBackground.args = {
  currValue: Currency.KZT,
  background: 'dark',
};
DarkBackground.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = {
  currValue: Currency.USD,
  readonly: true,
};
ReadonlyRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ReadonlyDarkRedesigned = Template.bind({});
ReadonlyDarkRedesigned.args = {
  currValue: Currency.USD,
  readonly: true,
};
ReadonlyDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
