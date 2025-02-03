import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleItemRedesigned } from './ArticleItemRedesigned';

export default {
  title: 'shared/ArticleItemRedesigned',
  component: ArticleItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleItemRedesigned>;

const Template: ComponentStory<typeof ArticleItemRedesigned> = (args) => <ArticleItemRedesigned {...args} />;

export const Default = Template.bind({});
Default.args = {};
