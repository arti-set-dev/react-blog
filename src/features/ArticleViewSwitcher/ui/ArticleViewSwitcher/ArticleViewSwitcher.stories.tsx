import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleViewSwitcher } from './ArticleViewSwitcher';
import { ArticleView } from '@/entities/Article';

export default {
  title: 'features/ArticleViewSwitcher',
  component: ArticleViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleViewSwitcher>;

const Template: ComponentStory<typeof ArticleViewSwitcher> = (args) => (
  <ArticleViewSwitcher {...args} />
);

// Старый дизайн (deprecated)
export const GridView = Template.bind({});
GridView.args = {
  view: ArticleView.GRID,
  onViewClick: () => {},
};
GridView.decorators = [StoreDecorator({})];

export const ColumnView = Template.bind({});
ColumnView.args = {
  view: ArticleView.COLUMN,
  onViewClick: () => {},
};
ColumnView.decorators = [StoreDecorator({})];

export const GridViewDark = Template.bind({});
GridViewDark.args = {
  view: ArticleView.GRID,
  onViewClick: () => {},
};
GridViewDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const ColumnViewDark = Template.bind({});
ColumnViewDark.args = {
  view: ArticleView.COLUMN,
  onViewClick: () => {},
};
ColumnViewDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const GridViewRedesigned = Template.bind({});
GridViewRedesigned.args = {
  view: ArticleView.GRID,
  onViewClick: () => {},
};
GridViewRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ColumnViewRedesigned = Template.bind({});
ColumnViewRedesigned.args = {
  view: ArticleView.COLUMN,
  onViewClick: () => {},
};
ColumnViewRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const GridViewDarkRedesigned = Template.bind({});
GridViewDarkRedesigned.args = {
  view: ArticleView.GRID,
  onViewClick: () => {},
};
GridViewDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const ColumnViewDarkRedesigned = Template.bind({});
ColumnViewDarkRedesigned.args = {
  view: ArticleView.COLUMN,
  onViewClick: () => {},
};
ColumnViewDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
