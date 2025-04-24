import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { SidebarRedesigned } from './SidebarRedesigned';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

export default {
  title: 'widgets/SidebarRedesigned',
  component: SidebarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    FeatureFlagsDecorator({ isAppRedesigned: true }),
  ],
} as ComponentMeta<typeof SidebarRedesigned>;

const Template: ComponentStory<typeof SidebarRedesigned> = (args) => <SidebarRedesigned {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
  StoreDecorator({
    user: {},
  }),
];
