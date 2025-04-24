import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Article, ArticleType } from '@/entities/Article';
import { ArticleCategoryRedesigned } from './ArticleCategoryRedesigned/ArticleCategoryRedesigned';
import { ArticleCategoryDeprecated } from './ArticleCategoryDeprecated/ArticleCategoryDeprecated';
import jsImage from './js.png';
import scienceImage from './geometry-1044090_960_720.webp';
import economicsImage from './entrepreneur-1340649_960_720.jpg';
import techImage from './artificial-intelligence-3382507_960_720.jpg';

export default {
  title: 'widgets/ArticleCategory',
  component: ArticleCategoryRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleCategoryRedesigned>;

const TemplateRedesigned: ComponentStory<typeof ArticleCategoryRedesigned> = (args) => (
  <ArticleCategoryRedesigned {...args} />
);

const TemplateDeprecated: ComponentStory<typeof ArticleCategoryDeprecated> = (args) => (
  <ArticleCategoryDeprecated {...args} />
);

const articles: Article[] = [
  {
    id: '1',
    title: 'Тестовая статья',
    subtitle: 'Подзаголовок статьи',
    img: jsImage,
    views: 1022,
    author: {
      id: '1',
      username: 'Админ',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'admin@test.com',
    },
    createdAt: '15.05.2022',
    type: [ArticleType.IT],
    blocks: [],
  },
  {
    id: '2',
    title: 'Научная статья',
    subtitle: 'Исследование новых технологий',
    img: scienceImage,
    views: 845,
    author: {
      id: '2',
      username: 'Научный автор',
      avatar: 'https://i.pravatar.cc/150?img=2',
      email: 'science@test.com',
    },
    createdAt: '20.06.2022',
    type: [ArticleType.SCIENCE],
    blocks: [],
  },
  {
    id: '3',
    title: 'Экономический обзор',
    subtitle: 'Анализ современных трендов',
    img: economicsImage,
    views: 634,
    author: {
      id: '3',
      username: 'Экономист',
      avatar: 'https://i.pravatar.cc/150?img=3',
      email: 'economy@test.com',
    },
    createdAt: '05.07.2022',
    type: [ArticleType.ECONOMICS],
    blocks: [],
  },
  {
    id: '4',
    title: 'Новые технологии',
    subtitle: 'Инновации в сфере IT',
    img: techImage,
    views: 1234,
    author: {
      id: '4',
      username: 'Техноблогер',
      avatar: 'https://i.pravatar.cc/150?img=4',
      email: 'tech@test.com',
    },
    createdAt: '12.08.2022',
    type: [ArticleType.SCIENCE],
    blocks: [],
  },
];

const baseArgs = {
  type: ArticleType.ALL,
  articles,
  isLoading: false,
  error: false,
  onChangeType: () => {},
};

export const Normal = TemplateDeprecated.bind({});
Normal.args = baseArgs;

export const NormalRedesigned = TemplateRedesigned.bind({});
NormalRedesigned.args = baseArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = TemplateDeprecated.bind({});
Loading.args = {
  ...baseArgs,
  articles: [],
  isLoading: true,
};

export const LoadingRedesigned = TemplateRedesigned.bind({});
LoadingRedesigned.args = {
  ...baseArgs,
  articles: [],
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator];

export const Error = TemplateDeprecated.bind({});
Error.args = {
  ...baseArgs,
  articles: [],
  error: true,
};

export const ErrorRedesigned = TemplateRedesigned.bind({});
ErrorRedesigned.args = {
  ...baseArgs,
  articles: [],
  error: true,
};
ErrorRedesigned.decorators = [NewDesignDecorator];

export const NoArticles = TemplateDeprecated.bind({});
NoArticles.args = {
  ...baseArgs,
  articles: [],
};

export const NoArticlesRedesigned = TemplateRedesigned.bind({});
NoArticlesRedesigned.args = {
  ...baseArgs,
  articles: [],
};
NoArticlesRedesigned.decorators = [NewDesignDecorator];

export const WithItType = TemplateDeprecated.bind({});
WithItType.args = {
  ...baseArgs,
  type: ArticleType.IT,
};

export const WithItTypeRedesigned = TemplateRedesigned.bind({});
WithItTypeRedesigned.args = {
  ...baseArgs,
  type: ArticleType.IT,
};
WithItTypeRedesigned.decorators = [NewDesignDecorator];
