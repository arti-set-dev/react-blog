import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/deprecated/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: '100%',
  height: 20,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  width: '100%',
  height: 20,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Circle = Template.bind({});
Circle.args = {
  width: 70,
  height: 70,
  border: '50%',
};

export const CircleDark = Template.bind({});
CircleDark.args = {
  width: 70,
  height: 70,
  border: '50%',
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DefaultOrange = Template.bind({});
Default.args = {
  width: '100%',
  height: 20,
};
DefaultOrange.decorators = [ThemeDecorator(Theme.ORANGE)];

export const CircleOrange = Template.bind({});
CircleOrange.args = {
  width: 70,
  height: 70,
  border: '50%',
};
CircleOrange.decorators = [ThemeDecorator(Theme.ORANGE)];
