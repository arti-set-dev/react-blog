import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopularPosts } from './PopularPosts';

export default {
  title: 'shared/PopularPosts',
  component: PopularPosts,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PopularPosts>;

const Template: ComponentStory<typeof PopularPosts> = (args) => <PopularPosts {...args} />;

export const Default = Template.bind({});
Default.args = {};
