import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Article, ArticleType } from '@/entities/Article';
import { PopularPostsRedesigned } from './PopularPostsRedesigned/PopularPostsRedesigned';
import { PopularPostsDeprecated } from './PopularPostsDeprecated/PopularPostsDeprecated';
import jsImage from './js.png';
import scienceImage from './geometry-1044090_960_720.webp';
import economicsImage from './entrepreneur-1340649_960_720.jpg';

export default {
  title: 'widgets/PopularPosts',
  component: PopularPostsRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof PopularPostsRedesigned>;

const TemplateRedesigned: ComponentStory<typeof PopularPostsRedesigned> = (args) => (
  <PopularPostsRedesigned {...args} />
);

const TemplateDeprecated: ComponentStory<typeof PopularPostsDeprecated> = (args) => (
  <PopularPostsDeprecated {...args} />
);

// Создаем моковые данные статей
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'JavaScript 2023: Что нового?',
    subtitle: 'Обзор новых возможностей языка',
    img: jsImage,
    views: 1024,
    createdAt: '12.02.2023',
    type: [ArticleType.IT],
    blocks: [],
    author: {
      id: '1',
      username: 'JSDeveloper',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'jsdeveloper@example.com',
    },
  },
  {
    id: '2',
    title: 'React против Angular: сравнение в 2023',
    subtitle: 'Какой фреймворк выбрать для нового проекта',
    img: jsImage,
    views: 876,
    createdAt: '10.03.2023',
    type: [ArticleType.IT],
    blocks: [],
    author: {
      id: '2',
      username: 'WebDeveloper',
      avatar: 'https://i.pravatar.cc/150?img=2',
      email: 'webdeveloper@example.com',
    },
  },
  {
    id: '3',
    title: 'Экономика будущего: тренды 2023',
    subtitle: 'Анализ глобальных экономических трендов',
    img: economicsImage,
    views: 742,
    createdAt: '05.04.2023',
    type: [ArticleType.ECONOMICS],
    blocks: [],
    author: {
      id: '3',
      username: 'EconomistPro',
      avatar: 'https://i.pravatar.cc/150?img=3',
      email: 'economist@example.com',
    },
  },
  {
    id: '4',
    title: 'Научные открытия года',
    subtitle: 'Прорывы в науке и технологиях',
    img: scienceImage,
    views: 635,
    createdAt: '21.05.2023',
    type: [ArticleType.SCIENCE],
    blocks: [],
    author: {
      id: '4',
      username: 'ScienceExplorer',
      avatar: 'https://i.pravatar.cc/150?img=4',
      email: 'scienceexplorer@example.com',
    },
  },
];

// Базовые параметры
const baseArgs = {
  articles: mockArticles,
  isFetching: false,
};

// Стандартный вид (устаревший дизайн)
export const Normal = TemplateDeprecated.bind({});
Normal.args = baseArgs;

// Стандартный вид (новый дизайн)
export const NormalRedesigned = TemplateRedesigned.bind({});
NormalRedesigned.args = baseArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

// Состояние загрузки (устаревший дизайн)
export const Loading = TemplateDeprecated.bind({});
Loading.args = {
  ...baseArgs,
  articles: undefined,
  isFetching: true,
};

// Состояние загрузки (новый дизайн)
export const LoadingRedesigned = TemplateRedesigned.bind({});
LoadingRedesigned.args = {
  ...baseArgs,
  articles: undefined,
  isFetching: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator];

// Пустое состояние (устаревший дизайн)
export const Empty = TemplateDeprecated.bind({});
Empty.args = {
  ...baseArgs,
  articles: [],
};

// Пустое состояние (новый дизайн)
export const EmptyRedesigned = TemplateRedesigned.bind({});
EmptyRedesigned.args = {
  ...baseArgs,
  articles: [],
};
EmptyRedesigned.decorators = [NewDesignDecorator];
