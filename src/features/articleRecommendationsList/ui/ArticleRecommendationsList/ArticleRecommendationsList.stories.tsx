import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from '@/entities/Article';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import image from './storybook.jpg';

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
);

const article: Article = {
  id: '1',
  // eslint-disable-next-line max-len
  img: image,
  createdAt: '19.07.2022',
  views: 123,
  author: { id: '1', username: '123', email: 'test@test.com' },
  blocks: [],
  type: [],
  title: 'News',
  subtitle: 'News subtitle',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
};

export const Scroll = Template.bind({});
Scroll.args = {};
Scroll.decorators = [StoreDecorator({})];
Scroll.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=7`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
        { ...article, id: '4' },
        { ...article, id: '5' },
        { ...article, id: '6' },
        { ...article, id: '7' },
      ],
    },
  ],
};
