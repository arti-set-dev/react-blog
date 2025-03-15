import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ServiceRulesPage from './ServiceRulesPage';

export default {
  title: 'shared/ServiceRulesPage',
  component: ServiceRulesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ServiceRulesPage>;

const Template: ComponentStory<typeof ServiceRulesPage> = (args) => <ServiceRulesPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
