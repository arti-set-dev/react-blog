import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleEdit } from './ArticleEdit';

export default {
  title: 'shared/ArticleEdit',
  component: ArticleEdit,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleEdit>;

const Template: ComponentStory<typeof ArticleEdit> = (args) => <ArticleEdit {...args} />;

export const Default = Template.bind({});
Default.args = {};
