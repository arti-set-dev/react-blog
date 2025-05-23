import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';

export default {
  title: 'widgets/ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => <ScrollToolbar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
