import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AvatarDrower } from './AvatarDrower';

export default {
  title: 'shared/AvatarDrower',
  component: AvatarDrower,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDrower>;

const Template: ComponentStory<typeof AvatarDrower> = (args) => <AvatarDrower {...args} />;

export const Default = Template.bind({});
Default.args = {};
