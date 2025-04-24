import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Button } from './Button';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';

export default {
  title: 'shared/redesigned/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// Варианты кнопок
export const Primary = Template.bind({});
Primary.args = {
  children: 'Кнопка',
  variant: 'primary',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Кнопка',
  variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Кнопка',
  variant: 'outline',
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
  children: 'Кнопка',
  variant: 'outline-red',
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
  children: 'Кнопка',
  variant: 'outline-inverted',
};

export const TextInverted = Template.bind({});
TextInverted.args = {
  children: 'Кнопка',
  variant: 'text-inverted',
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  children: 'Кнопка',
  variant: 'text-primary',
};

export const TextLight = Template.bind({});
TextLight.args = {
  children: 'Кнопка',
  variant: 'text-light',
};

export const Active = Template.bind({});
Active.args = {
  children: 'Кнопка',
  variant: 'active',
};

export const Icon = Template.bind({});
Icon.args = {
  variant: 'icon',
  Svg: SearchIcon,
};

// Позиции кнопок
export const TopLeft = Template.bind({});
TopLeft.args = {
  children: 'Кнопка',
  position: 'top-left',
};

export const TopRight = Template.bind({});
TopRight.args = {
  children: 'Кнопка',
  position: 'top-right',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  children: 'Кнопка',
  position: 'bottom-left',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  children: 'Кнопка',
  position: 'bottom-right',
};

// Выравнивания текста
export const AlignLeft = Template.bind({});
AlignLeft.args = {
  children: 'Кнопка',
  align: 'left',
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
  children: 'Кнопка',
  align: 'center',
};

export const AlignRight = Template.bind({});
AlignRight.args = {
  children: 'Кнопка',
  align: 'right',
};

// Состояния кнопок
export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Кнопка',
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Кнопка на всю ширину',
  fullWidth: true,
};

export const Hovered = Template.bind({});
Hovered.args = {
  children: 'Кнопка',
  isHovered: true,
};

export const ActiveState = Template.bind({});
ActiveState.args = {
  children: 'Кнопка',
  isActive: true,
};

// Анимации
export const ShakeAnimation = Template.bind({});
ShakeAnimation.args = {
  children: 'Кнопка',
  animation: 'shake',
};

// Темные варианты
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Кнопка',
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: 'Кнопка',
  variant: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const IconWithText = Template.bind({});
IconWithText.args = {
  children: 'Поиск',
  Svg: SearchIcon,
};
