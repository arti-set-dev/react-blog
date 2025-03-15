import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PrivacyPolicyPage from './PrivacyPolicyPage';

export default {
  title: 'shared/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PrivacyPolicyPage>;

const Template: ComponentStory<typeof PrivacyPolicyPage> = (args) => <PrivacyPolicyPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
