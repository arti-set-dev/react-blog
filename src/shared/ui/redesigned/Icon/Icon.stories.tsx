import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Icon } from './Icon';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import StarIcon from '@/shared/assets/icons/star-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import CheckIcon from '@/shared/assets/icons/check-icon.svg';

export default {
  title: 'shared/redesigned/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

// Базовые иконки
export const Default = Template.bind({});
Default.args = {
  Svg: HomeIcon,
};

export const DefaultSmall = Template.bind({});
DefaultSmall.args = {
  Svg: HomeIcon,
  width: 16,
  height: 16,
};

export const DefaultLarge = Template.bind({});
DefaultLarge.args = {
  Svg: HomeIcon,
  width: 48,
  height: 48,
};

// Цветные иконки
export const Primary = Template.bind({});
Primary.args = {
  Svg: StarIcon,
  color: 'primary',
};

export const Error = Template.bind({});
Error.args = {
  Svg: WarningIcon,
  color: 'error',
};

export const Inverted = Template.bind({});
Inverted.args = {
  Svg: SearchIcon,
  color: 'inverted',
};

export const Success = Template.bind({});
Success.args = {
  Svg: CheckIcon,
  color: 'success',
};

export const Normal = Template.bind({});
Normal.args = {
  Svg: ProfileIcon,
  color: 'normal',
};

// Кликабельная иконка
export const Clickable = Template.bind({});
Clickable.args = {
  Svg: CopyIcon,
  clickable: true,
  onClick: () => alert('Иконка нажата!'),
};

// Анимация
export const WithAnimation = Template.bind({});
WithAnimation.args = {
  Svg: StarIcon,
  animation: 'show',
};

// Темная тема
export const DefaultDark = Template.bind({});
DefaultDark.args = {
  Svg: HomeIcon,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  Svg: StarIcon,
  color: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  Svg: WarningIcon,
  color: 'error',
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const InvertedDark = Template.bind({});
InvertedDark.args = {
  Svg: SearchIcon,
  color: 'inverted',
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];
