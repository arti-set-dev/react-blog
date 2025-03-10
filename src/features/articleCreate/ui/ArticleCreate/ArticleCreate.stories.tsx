import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleCreate } from './ArticleCreate';

export default {
  title: 'shared/ArticleCreate',
  component: ArticleCreate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleCreate>;

const Template: ComponentStory<typeof ArticleCreate> = (args) => <ArticleCreate {...args} />;

export const Default = Template.bind({});
Default.args = {};
