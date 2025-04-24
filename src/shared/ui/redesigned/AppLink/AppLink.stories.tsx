import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { AppLink } from './AppLink';
import HomeIcon from '@/shared/assets/icons/home-icon-new.svg';

export default {
  title: 'shared/redesigned/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'Текст ссылки',
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
  variant: 'primary-light',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Red = Template.bind({});
Red.args = {
  variant: 'red',
};

export const Inverted = Template.bind({});
Inverted.args = {
  variant: 'inverted',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryLightDark = Template.bind({});
PrimaryLightDark.args = {
  variant: 'primary-light',
};
PrimaryLightDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  variant: 'secondary',
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedDark = Template.bind({});
RedDark.args = {
  variant: 'red',
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const InvertedDark = Template.bind({});
InvertedDark.args = {
  variant: 'inverted',
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Главная',
  Svg: HomeIcon,
};

export const WithIconHovered = Template.bind({});
WithIconHovered.args = {
  children: 'Главная',
  Svg: HomeIcon,
  isHovered: true,
};

export const WithActiveLink = Template.bind({});
WithActiveLink.args = {
  children: 'Активная ссылка',
  activeClassName: 'active',
  to: '/', // Это активный путь в RouterDecorator
};
