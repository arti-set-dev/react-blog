import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import IconArr from '@/shared/assets/icons/arrow-icon.svg';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/deprecated/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Кнопка',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Кнопка',
  theme: ButtonTheme.OUTLINE,
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
  children: 'Кнопка',
  theme: ButtonTheme.OUTLINE_RED,
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
  children: 'Кнопка',
  theme: ButtonTheme.OUTLINE_INVERTED,
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  children: 'Кнопка',
  theme: ButtonTheme.TEXT_PRIMARY,
};

export const TextInverted = Template.bind({});
TextInverted.args = {
  children: 'Кнопка',
  theme: ButtonTheme.TEXT_INVERTED,
};

export const Icon = Template.bind({});
Icon.args = {
  children: '>',
  theme: ButtonTheme.ICON,
};

export const Active = Template.bind({});
Active.args = {
  children: 'Кнопка',
  theme: ButtonTheme.ACTIVE,
};

export const DisabledPrimary = Template.bind({});
DisabledPrimary.args = {
  children: 'Кнопка',
  disabled: true,
};

export const DisabledOutline = Template.bind({});
DisabledOutline.args = {
  children: 'Кнопка',
  theme: ButtonTheme.OUTLINE,
  disabled: true,
};

export const SizeXS = Template.bind({});
SizeXS.args = {
  children: 'Кнопка',
  size: ButtonSize.XS,
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Кнопка',
  size: ButtonSize.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Кнопка',
  size: ButtonSize.XL,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Кнопка на всю ширину',
  fullWidth: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Кнопка',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: 'Кнопка',
  theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

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

export const OutlineInvertedDark = Template.bind({});
OutlineInvertedDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE_INVERTED,
};
OutlineInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextInvertedDark = Template.bind({});
TextInvertedDark.args = {
  children: 'Text',
  theme: ButtonTheme.TEXT_INVERTED,
};
TextInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DisabledDark = Template.bind({});
DisabledDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE_INVERTED,
  disabled: true,
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];
