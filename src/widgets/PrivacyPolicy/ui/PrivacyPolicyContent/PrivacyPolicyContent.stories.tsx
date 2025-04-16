import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

export default {
  title: 'shared/PrivacyPolicyContent',
  component: PrivacyPolicyContent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PrivacyPolicyContent>;

const Template: ComponentStory<typeof PrivacyPolicyContent> = (args) => <PrivacyPolicyContent {...args} />;

export const Default = Template.bind({});
Default.args = {};
