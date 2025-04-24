import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleSortSelector } from './ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';

export default {
  title: 'features/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => (
  <ArticleSortSelector {...args} />
);

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  sort: ArticleSortField.CREATED,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
Normal.decorators = [StoreDecorator({})];

export const WithTitle = Template.bind({});
WithTitle.args = {
  sort: ArticleSortField.TITLE,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
WithTitle.decorators = [StoreDecorator({})];

export const WithViews = Template.bind({});
WithViews.args = {
  sort: ArticleSortField.VIEWS,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
WithViews.decorators = [StoreDecorator({})];

export const DescOrder = Template.bind({});
DescOrder.args = {
  sort: ArticleSortField.CREATED,
  order: 'desc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
DescOrder.decorators = [StoreDecorator({})];

export const NormalDark = Template.bind({});
NormalDark.args = {
  sort: ArticleSortField.CREATED,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  sort: ArticleSortField.CREATED,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithTitleRedesigned = Template.bind({});
WithTitleRedesigned.args = {
  sort: ArticleSortField.TITLE,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
WithTitleRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithViewsRedesigned = Template.bind({});
WithViewsRedesigned.args = {
  sort: ArticleSortField.VIEWS,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
WithViewsRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const DescOrderRedesigned = Template.bind({});
DescOrderRedesigned.args = {
  sort: ArticleSortField.CREATED,
  order: 'desc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
DescOrderRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  sort: ArticleSortField.CREATED,
  order: 'asc',
  onChangeOrder: () => {},
  onChangeSort: () => {},
};
NormalDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
