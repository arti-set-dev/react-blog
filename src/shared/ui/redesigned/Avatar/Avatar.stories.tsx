import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Avatar } from './Avatar';
import avatar from './storybook.jpg';

export default {
  title: 'shared/redesigned/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 100,
};

export const Small = Template.bind({});
Small.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 50,
};

export const Large = Template.bind({});
Large.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 150,
};

export const WithAdmin = Template.bind({});
WithAdmin.args = {
  src: avatar,
  alt: 'Аватар администратора',
  size: 100,
  isAdmin: true,
};

export const Editable = Template.bind({});
Editable.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 100,
  readonly: false,
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  alt: 'Аватар пользователя',
  size: 100,
};

export const WithoutImageAdmin = Template.bind({});
WithoutImageAdmin.args = {
  alt: 'Аватар администратора',
  size: 100,
  isAdmin: true,
};

export const EagerLoading = Template.bind({});
EagerLoading.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 100,
  loading: 'eager',
};

export const DarkThemeAdmin = Template.bind({});
DarkThemeAdmin.args = {
  src: avatar,
  alt: 'Аватар администратора',
  size: 100,
  isAdmin: true,
};
DarkThemeAdmin.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkThemeEditable = Template.bind({});
DarkThemeEditable.args = {
  src: avatar,
  alt: 'Аватар пользователя',
  size: 100,
  readonly: false,
};
DarkThemeEditable.decorators = [ThemeDecorator(Theme.DARK)];
