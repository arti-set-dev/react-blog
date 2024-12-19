import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetailsPageComments } from './ArticleDetailsPageComments';

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageComments',
  component: ArticleDetailsPageComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPageComments>;

const Template: ComponentStory<typeof ArticleDetailsPageComments> = (args) => <ArticleDetailsPageComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  id: '1',
};
Normal.decorators = [StoreDecorator({})];
