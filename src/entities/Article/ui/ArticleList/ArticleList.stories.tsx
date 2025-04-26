/* eslint-disable max-len */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Article } from '../../model/types/article';
import { ArticleList } from './ArticleList';
import storybook from './storybook.jpg';
import { ArticleView } from '../../model/consts/consts';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleType, ArticleBlockType } from '../../model/types/articleType';

export default {
  title: 'entities/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const articles = [
  {
    id: '1',
    title: 'Javascript news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: storybook,
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    type: [ArticleType.IT],
    blocks: [
      {
        id: '1',
        type: ArticleBlockType.TEXT,
        title: 'Заголовок этого блока',
        paragraphs: [
          'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
          'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        ],
      },
      {
        id: '2',
        type: ArticleBlockType.CODE,
        code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
      },
      {
        id: '4',
        type: ArticleBlockType.IMAGE,
        src: storybook,
        title: 'Рисунок 1 - скриншот сайта',
      },
    ],
  },
  {
    id: '2',
    title: 'Python news',
    subtitle: 'Что нового в Python за 2022 год?',
    img: storybook,
    views: 812,
    createdAt: '10.03.2022',
    user: {
      id: '2',
      username: 'Roman',
      avatar: storybook,
    },
    type: [ArticleType.IT],
    blocks: [
      {
        id: '1',
        type: ArticleBlockType.TEXT,
        title: 'Введение',
        paragraphs: [
          'Python — высокоуровневый язык программирования, который активно используется в области искусственного интеллекта и машинного обучения.',
        ],
      },
      {
        id: '2',
        type: ArticleBlockType.CODE,
        code: 'print("Hello, world!")',
      },
    ],
  },
  {
    id: '3',
    title: 'Новости фронтенда',
    subtitle: 'Что нового в мире фронтенд-разработки?',
    img: storybook,
    views: 1587,
    createdAt: '05.04.2022',
    user: {
      id: '3',
      username: 'Roman',
      avatar: storybook,
    },
    type: [ArticleType.IT],
    blocks: [
      {
        id: '1',
        type: ArticleBlockType.TEXT,
        title: 'Современный фронтенд',
        paragraphs: [
          'Фронтенд-разработка постоянно эволюционирует, предоставляя разработчикам новые инструменты и технологии.',
        ],
      },
      {
        id: '4',
        type: ArticleBlockType.IMAGE,
        src: storybook,
        title: 'Современные фреймворки',
      },
    ],
  },
] as Article[];

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

// Стандартный дизайн (старый)
export const Grid = Template.bind({});
Grid.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
};
Grid.decorators = [StoreDecorator({})];

export const Column = Template.bind({});
Column.args = {
  isLoading: false,
  articles,
  view: ArticleView.COLUMN,
};
Column.decorators = [StoreDecorator({})];

export const GridLoading = Template.bind({});
GridLoading.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.GRID,
};
GridLoading.decorators = [StoreDecorator({})];

export const ColumnLoading = Template.bind({});
ColumnLoading.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.COLUMN,
};
ColumnLoading.decorators = [StoreDecorator({})];

export const GridError = Template.bind({});
GridError.args = {
  error: true,
  articles: [],
  view: ArticleView.GRID,
};
GridError.decorators = [StoreDecorator({})];

export const GridEmpty = Template.bind({});
GridEmpty.args = {
  articles: [],
  view: ArticleView.GRID,
};
GridEmpty.decorators = [StoreDecorator({})];

export const GridWithBlank = Template.bind({});
GridWithBlank.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  blank: true,
};
GridWithBlank.decorators = [StoreDecorator({})];

export const GridVirtualized = Template.bind({});
GridVirtualized.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  virtualized: __PROJECT__ !== 'storybook' && true,
  onScrollEnd: action('onScrollEnd'),
};
GridVirtualized.decorators = [StoreDecorator({})];

export const GridWithInvertOnHover = Template.bind({});
GridWithInvertOnHover.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  invertOnHover: true,
};
GridWithInvertOnHover.decorators = [StoreDecorator({})];

// Новый дизайн (redesigned)
export const GridRedesigned = Template.bind({});
GridRedesigned.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
};
GridRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ColumnRedesigned = Template.bind({});
ColumnRedesigned.args = {
  isLoading: false,
  articles,
  view: ArticleView.COLUMN,
};
ColumnRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridLoadingRedesigned = Template.bind({});
GridLoadingRedesigned.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.GRID,
};
GridLoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ColumnLoadingRedesigned = Template.bind({});
ColumnLoadingRedesigned.args = {
  isLoading: true,
  articles: [],
  view: ArticleView.COLUMN,
};
ColumnLoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridErrorRedesigned = Template.bind({});
GridErrorRedesigned.args = {
  error: true,
  articles: [],
  view: ArticleView.GRID,
};
GridErrorRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridEmptyRedesigned = Template.bind({});
GridEmptyRedesigned.args = {
  articles: [],
  view: ArticleView.GRID,
};
GridEmptyRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridWithBlankRedesigned = Template.bind({});
GridWithBlankRedesigned.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  blank: true,
};
GridWithBlankRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridVirtualizedRedesigned = Template.bind({});
GridVirtualizedRedesigned.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  virtualized: __PROJECT__ !== 'storybook' && true,
  onScrollEnd: action('onScrollEnd'),
};
GridVirtualizedRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridWithInvertOnHoverRedesigned = Template.bind({});
GridWithInvertOnHoverRedesigned.args = {
  isLoading: false,
  articles,
  view: ArticleView.GRID,
  invertOnHover: true,
};
GridWithInvertOnHoverRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
