import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultError = Template.bind({});
DefaultError.args = {
  error: 'Invalid value',
};

export const DefaultErrorDark = Template.bind({});
DefaultErrorDark.args = {
  error: 'Invalid value',
};
DefaultErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'text',
};

export const PlaceholderDark = Template.bind({});
PlaceholderDark.args = {
  placeholder: 'text',
};
PlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PlaceholderError = Template.bind({});
PlaceholderError.args = {
  placeholder: 'text',
  error: 'Invalid value',
};

export const PlaceholderErrorDark = Template.bind({});
PlaceholderErrorDark.args = {
  placeholder: 'text',
  error: 'Invalid value',
};
PlaceholderErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PlaceholderReadonly = Template.bind({});
PlaceholderReadonly.args = {
  placeholder: 'text',
  readonly: true,
  value: 'some text',
};

export const PlaceholderReadonlyDark = Template.bind({});
PlaceholderReadonlyDark.args = {
  placeholder: 'text',
  readonly: true,
  value: 'some text',
};
PlaceholderReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];
