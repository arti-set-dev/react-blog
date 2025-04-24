import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CountrySelect } from './CountrySelect';
import { Country } from '../../model/types/country';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
  <CountrySelect {...args} />
);

// Старый дизайн (deprecated)
export const Default = Template.bind({});
Default.args = {
  currValue: Country.Germany,
};
Default.decorators = [StoreDecorator({})];

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  currValue: Country.Germany,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Readonly = Template.bind({});
Readonly.args = {
  currValue: Country.USA,
  readonly: true,
};
Readonly.decorators = [StoreDecorator({})];

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {
  currValue: Country.USA,
  readonly: true,
};
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = {
  currValue: Country.Germany,
};
DefaultRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const DefaultDarkRedesigned = Template.bind({});
DefaultDarkRedesigned.args = {
  currValue: Country.Germany,
};
DefaultDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const LightBackground = Template.bind({});
LightBackground.args = {
  currValue: Country.Kazakhstan,
  background: 'light',
};
LightBackground.decorators = [NewDesignDecorator, StoreDecorator({})];

export const DarkBackground = Template.bind({});
DarkBackground.args = {
  currValue: Country.Kazakhstan,
  background: 'dark',
};
DarkBackground.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ReadonlyRedesigned = Template.bind({});
ReadonlyRedesigned.args = {
  currValue: Country.USA,
  readonly: true,
};
ReadonlyRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ReadonlyDarkRedesigned = Template.bind({});
ReadonlyDarkRedesigned.args = {
  currValue: Country.USA,
  readonly: true,
};
ReadonlyDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
