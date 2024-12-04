import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { {{name}} } from './{{name}}';

export default {
  title: 'shared/{{name}}',
  component: {{name}},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof {{name}}>;

const Template: ComponentStory<typeof {{name}}> = (args) => <{{name}} {...args} />;

export const Default = Template.bind({});
Default.args = {};