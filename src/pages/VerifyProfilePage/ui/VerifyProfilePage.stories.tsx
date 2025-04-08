import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import VerifyProfilePage from './VerifyProfilePage';

export default {
  title: 'shared/VerifyProfilePage',
  component: VerifyProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof VerifyProfilePage>;

const Template: ComponentStory<typeof VerifyProfilePage> = (args) => <VerifyProfilePage {...args} />;

export const Default = Template.bind({});
Default.args = {};
