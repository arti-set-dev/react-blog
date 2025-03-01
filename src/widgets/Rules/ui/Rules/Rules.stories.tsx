import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Rules } from './Rules';

export default {
  title: 'shared/Rules',
  component: Rules,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Rules>;

const Template: ComponentStory<typeof Rules> = (args) => <Rules {...args} />;

export const Default = Template.bind({});
Default.args = {};
