import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleViewSwitcher } from './ArticleViewSwither';

export default {
  title: 'entities/Article/ArticleViewSwitcher',
  component: ArticleViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleViewSwitcher>;

const Template: ComponentStory<typeof ArticleViewSwitcher> = (args) => <ArticleViewSwitcher {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
