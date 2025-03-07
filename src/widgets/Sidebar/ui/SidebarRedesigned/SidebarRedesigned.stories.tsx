import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SidebarRedesigned } from './SidebarRedesigned';

export default {
  title: 'shared/SidebarRedesigned',
  component: SidebarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SidebarRedesigned>;

const Template: ComponentStory<typeof SidebarRedesigned> = (args) => <SidebarRedesigned {...args} />;

export const Default = Template.bind({});
Default.args = {};
