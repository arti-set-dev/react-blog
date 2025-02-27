import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MainHero } from './MainHero';

export default {
  title: 'shared/MainHero',
  component: MainHero,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MainHero>;

const Template: ComponentStory<typeof MainHero> = (args) => <MainHero {...args} />;

export const Default = Template.bind({});
Default.args = {};
