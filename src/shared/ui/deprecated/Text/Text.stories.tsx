import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {
  Text, TextSize, TextTheme, TextWeight,
} from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  theme: TextTheme.PRIMARY,
};

export const ErrorText = Template.bind({});
ErrorText.args = {
  theme: TextTheme.ERROR,
};

export const InvertedText = Template.bind({});
InvertedText.args = {
  theme: TextTheme.INVERTED,
};

export const SmallText = Template.bind({});
SmallText.args = {
  size: TextSize.XS,
  theme: TextTheme.PRIMARY,
  weight: TextWeight.REGULAR,
};

export const ExtraSmallText = Template.bind({});
ExtraSmallText.args = {
  size: TextSize.S,
  theme: TextTheme.PRIMARY,
  weight: TextWeight.REGULAR,
};

export const MediumText = Template.bind({});
MediumText.args = {
  size: TextSize.M,
  theme: TextTheme.PRIMARY,
  weight: TextWeight.REGULAR,
};

export const LargeText = Template.bind({});
LargeText.args = {
  size: TextSize.L,
  theme: TextTheme.PRIMARY,
  weight: TextWeight.REGULAR,
};

export const ExtraLargeText = Template.bind({});
ExtraLargeText.args = {
  size: TextSize.XL,
  theme: TextTheme.PRIMARY,
  weight: TextWeight.REGULAR,
};

export const BoldText = Template.bind({});
BoldText.args = {
  weight: TextWeight.BOLD,
  theme: TextTheme.PRIMARY,
};

export const RegularText = Template.bind({});
RegularText.args = {
  weight: TextWeight.REGULAR,
  theme: TextTheme.PRIMARY,
};

export const InvertedTextDark = Template.bind({});
InvertedTextDark.args = {
  theme: TextTheme.INVERTED,
};

InvertedTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorTextDark = Template.bind({});
ErrorTextDark.args = {
  theme: TextTheme.ERROR,
};

ErrorTextDark.decorators = [ThemeDecorator(Theme.DARK)];
