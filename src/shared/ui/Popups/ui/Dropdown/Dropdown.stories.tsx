import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button, ButtonTheme } from '../../../Button/Button';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};
