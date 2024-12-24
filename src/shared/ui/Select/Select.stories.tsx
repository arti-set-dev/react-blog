import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    Select: 'Select',
    options: [
      { value: 'Same value 1', content: 'Some content 1' },
      { value: 'Same value 2', content: 'Some content 2' },
      { value: 'Same value 3', content: 'Some content 3' },
    ],
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectDefault = Template.bind({});
SelectDefault.args = {};

export const SelectDefaultDark = Template.bind({});
SelectDefaultDark.args = {};
SelectDefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SelectLabel = Template.bind({});
SelectLabel.args = {
  label: 'Some label',
};

export const SelectLabelDark = Template.bind({});
SelectLabelDark.args = {
  label: 'Some label',
};
SelectLabelDark.decorators = [ThemeDecorator(Theme.DARK)];
