import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ArticlesFilters } from './ArticlesFilters';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/SortOrder';

export default {
  title: 'widgets/ArticlesFilters',
  component: ArticlesFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticlesFilters>;

const Template: ComponentStory<typeof ArticlesFilters> = (args) => (
  <ArticlesFilters {...args} />
);

const baseArgs = {
  sort: ArticleSortField.CREATED,
  order: 'asc' as SortOrder,
  search: '',
  type: ArticleType.ALL,
  onChangeSearch: action('onChangeSearch'),
  onChangeOrder: action('onChangeOrder'),
  onChangeSort: action('onChangeSort'),
  onChangeType: action('onChangeType'),
};

export const Default = Template.bind({});
Default.args = baseArgs;
Default.decorators = [NewDesignDecorator];

export const WithSearch = Template.bind({});
WithSearch.args = {
  ...baseArgs,
  search: 'JavaScript',
};
WithSearch.decorators = [NewDesignDecorator];

export const WithTypeIt = Template.bind({});
WithTypeIt.args = {
  ...baseArgs,
  type: ArticleType.IT,
};
WithTypeIt.decorators = [NewDesignDecorator];

export const WithTypeScience = Template.bind({});
WithTypeScience.args = {
  ...baseArgs,
  type: ArticleType.SCIENCE,
};
WithTypeScience.decorators = [NewDesignDecorator];

export const WithTypeEconomics = Template.bind({});
WithTypeEconomics.args = {
  ...baseArgs,
  type: ArticleType.ECONOMICS,
};
WithTypeEconomics.decorators = [NewDesignDecorator];

export const WithTypePolitics = Template.bind({});
WithTypePolitics.args = {
  ...baseArgs,
  type: ArticleType.POLITICS,
};
WithTypePolitics.decorators = [NewDesignDecorator];

export const SortByViews = Template.bind({});
SortByViews.args = {
  ...baseArgs,
  sort: ArticleSortField.VIEWS,
};
SortByViews.decorators = [NewDesignDecorator];

export const SortByTitle = Template.bind({});
SortByTitle.args = {
  ...baseArgs,
  sort: ArticleSortField.TITLE,
};
SortByTitle.decorators = [NewDesignDecorator];

export const OrderDesc = Template.bind({});
OrderDesc.args = {
  ...baseArgs,
  order: 'desc' as SortOrder,
};
OrderDesc.decorators = [NewDesignDecorator];

export const Complex = Template.bind({});
Complex.args = {
  ...baseArgs,
  search: 'React',
  type: ArticleType.IT,
  sort: ArticleSortField.VIEWS,
  order: 'desc' as SortOrder,
};
Complex.decorators = [NewDesignDecorator];
