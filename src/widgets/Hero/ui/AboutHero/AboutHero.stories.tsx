import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AboutHero } from './AboutHero';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'widgets/Hero/AboutHero',
  component: AboutHero,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutHero>;

const Template: ComponentStory<typeof AboutHero> = (args) => <AboutHero {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({})];

export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
