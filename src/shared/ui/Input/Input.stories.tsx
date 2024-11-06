import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProveder';
import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const LineInverted = Template.bind({});
LineInverted.args = {};

export const LineInvertedDark = Template.bind({});
LineInvertedDark.args = {};
LineInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const LineInvertedPlaceholder = Template.bind({});
LineInvertedPlaceholder.args = {
  placeholder: 'text',
};

export const LineInvertedPlaceholderDark = Template.bind({});
LineInvertedPlaceholderDark.args = {
  placeholder: 'text',
};
LineInvertedPlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)];
