import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Listbox } from './ListBox';

export default {
  title: 'shared/redesigned/ListBox',
  component: Listbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => (
  <Listbox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  defaultValue: 'Select options',
  items: [
    { value: '1', content: 'content 1' },
    { value: '2', content: 'content 2' },
    { value: '3', content: 'content 3' },
  ],
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  defaultValue: 'Select options',
  items: [
    { value: '1', content: 'content 1' },
    { value: '2', content: 'content 2', disabled: true },
    { value: '3', content: 'content 3' },
  ],
};
