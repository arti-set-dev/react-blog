import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import PersonImg from './storybook.jpg';
import { Avatar } from './Avatar';

export default {
  title: 'shared/deprecated/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const AvatarDefault = Template.bind({});
AvatarDefault.args = {
  size: 100,
  alt: 'Avatar',
  src: PersonImg,
};

export const AvatarMore = Template.bind({});
AvatarMore.args = {
  size: 200,
  alt: 'Avatar',
  src: PersonImg,
};

export const AvatarOnlyAlt = Template.bind({});
AvatarOnlyAlt.args = {
  size: 200,
  alt: 'Avatar',
  src: '',
};

export const AvatarOnlyAltDark = Template.bind({});
AvatarOnlyAltDark.args = {
  size: 200,
  alt: 'Avatar',
  src: '',
};
AvatarOnlyAltDark.decorators = [ThemeDecorator(Theme.DARK)];
