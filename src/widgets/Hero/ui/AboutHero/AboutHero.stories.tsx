import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AboutHero } from './AboutHero';

export default {
  title: 'shared/AboutHero',
  component: AboutHero,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutHero>;

const Template: ComponentStory<typeof AboutHero> = (args) => <AboutHero {...args} />;

export const Default = Template.bind({});
Default.args = {};
