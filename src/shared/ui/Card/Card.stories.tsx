import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
import {
  Text, TextSize, TextTheme, TextWeight,
} from '../Text/Text';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Text
        size={TextSize.L}
        weight={TextWeight.BOLD}
        theme={TextTheme.PRIMARY}
      >
        Some text
      </Text>
      <Text theme={TextTheme.PRIMARY}>Some text</Text>
    </>
  ),
};
