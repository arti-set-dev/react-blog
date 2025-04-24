import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Skeleton } from './Skeleton';

export default {
  title: 'shared/redesigned/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 200,
  height: 50,
};

export const Circle = Template.bind({});
Circle.args = {
  width: 100,
  height: 100,
  border: 'circle',
};

export const Round = Template.bind({});
Round.args = {
  width: 200,
  height: 50,
  border: '8',
};

export const WithBorder4 = Template.bind({});
WithBorder4.args = {
  width: 200,
  height: 50,
  border: '4',
};

export const WithBorder10 = Template.bind({});
WithBorder10.args = {
  width: 200,
  height: 50,
  border: '10',
};

export const WithBorder12 = Template.bind({});
WithBorder12.args = {
  width: 200,
  height: 50,
  border: '12',
};

export const WithBorder20 = Template.bind({});
WithBorder20.args = {
  width: 200,
  height: 50,
  border: '20',
};

export const Avatar = Template.bind({});
Avatar.args = {
  width: 50,
  height: 50,
  border: 'circle',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  width: 200,
  height: 50,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const TextBlock = Template.bind({});
TextBlock.args = {
  width: '100%',
  height: 200,
};

export const TextLine = Template.bind({});
TextLine.args = {
  width: '100%',
  height: 20,
  border: '4',
};
