import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCategory } from './ArticleCategory';

export default {
  title: 'shared/ArticleCategory',
  component: ArticleCategory,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleCategory>;

const Template: ComponentStory<typeof ArticleCategory> = (args) => <ArticleCategory />;

export const Default = Template.bind({});
Default.args = {};
