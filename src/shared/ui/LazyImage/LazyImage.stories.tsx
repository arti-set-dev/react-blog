import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LazyImage } from './LazyImage';

export default {
  title: 'shared/LazyImage',
  component: LazyImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LazyImage>;

const Template: ComponentStory<typeof LazyImage> = (args) => (
  <LazyImage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
