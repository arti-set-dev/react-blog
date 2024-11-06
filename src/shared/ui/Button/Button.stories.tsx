import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProveder';
import IconArr from 'shared/assets/icons/arrow-icon.svg';
import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  children: <IconArr />,
  theme: ButtonTheme.ICON,
};

export const IconL = Template.bind({});
IconL.args = {
  children: <IconArr />,
  theme: ButtonTheme.ICON,
  size: ButtonSize.L,
};

export const IconLDark = Template.bind({});
IconLDark.args = {
  children: <IconArr />,
  theme: ButtonTheme.ICON,
  size: ButtonSize.L,
};
IconLDark.decorators = [ThemeDecorator(Theme.DARK)];

export const IconXL = Template.bind({});
IconXL.args = {
  children: <IconArr />,
  theme: ButtonTheme.ICON,
  size: ButtonSize.XL,
};

export const IconXLDark = Template.bind({});
IconXLDark.args = {
  children: <IconArr />,
  theme: ButtonTheme.ICON,
  size: ButtonSize.XL,
};
IconXLDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE_INVERTED,
};

export const OutlineInvertedDark = Template.bind({});
OutlineInvertedDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE_INVERTED,
};
OutlineInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextInverted = Template.bind({});

TextInverted.args = {
  children: 'Text',
  theme: ButtonTheme.TEXT_INVERTED,
};

export const TextInvertedDark = Template.bind({});

TextInvertedDark.args = {
  children: 'Text',
  theme: ButtonTheme.TEXT_INVERTED,
};
TextInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Primary = Template.bind({});

Primary.args = {
  children: 'Text',
  theme: ButtonTheme.PRIMARY,
};

export const PrimaryDark = Template.bind({});

PrimaryDark.args = {
  children: 'Text',
  theme: ButtonTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
