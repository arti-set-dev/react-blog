import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PrivacyPolicy } from './PrivacyPolicy';

export default {
  title: 'shared/PrivacyPolicy',
  component: PrivacyPolicy,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PrivacyPolicy>;

const Template: ComponentStory<typeof PrivacyPolicy> = (args) => <PrivacyPolicy {...args} />;

export const Default = Template.bind({});
Default.args = {};
