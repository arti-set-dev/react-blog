import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';

export default {
  title: 'features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => (
  <ArticleTypeTabs {...args} />
);

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  value: ArticleType.ALL,
  onChangeType: () => {},
};
Normal.decorators = [StoreDecorator({})];

export const IT = Template.bind({});
IT.args = {
  value: ArticleType.IT,
  onChangeType: () => {},
};
IT.decorators = [StoreDecorator({})];

export const SCIENCE = Template.bind({});
SCIENCE.args = {
  value: ArticleType.SCIENCE,
  onChangeType: () => {},
};
SCIENCE.decorators = [StoreDecorator({})];

export const ECONOMICS = Template.bind({});
ECONOMICS.args = {
  value: ArticleType.ECONOMICS,
  onChangeType: () => {},
};
ECONOMICS.decorators = [StoreDecorator({})];

export const POLITICS = Template.bind({});
POLITICS.args = {
  value: ArticleType.POLITICS,
  onChangeType: () => {},
};
POLITICS.decorators = [StoreDecorator({})];

export const NormalDark = Template.bind({});
NormalDark.args = {
  value: ArticleType.ALL,
  onChangeType: () => {},
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const RowDirection = Template.bind({});
RowDirection.args = {
  value: ArticleType.ALL,
  direction: 'row',
  onChangeType: () => {},
};
RowDirection.decorators = [StoreDecorator({})];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  value: ArticleType.ALL,
  onChangeType: () => {},
};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ITRedesigned = Template.bind({});
ITRedesigned.args = {
  value: ArticleType.IT,
  onChangeType: () => {},
};
ITRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const SCIENCERedesigned = Template.bind({});
SCIENCERedesigned.args = {
  value: ArticleType.SCIENCE,
  onChangeType: () => {},
};
SCIENCERedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ECONOMICSRedesigned = Template.bind({});
ECONOMICSRedesigned.args = {
  value: ArticleType.ECONOMICS,
  onChangeType: () => {},
};
ECONOMICSRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const POLITICSRedesigned = Template.bind({});
POLITICSRedesigned.args = {
  value: ArticleType.POLITICS,
  onChangeType: () => {},
};
POLITICSRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  value: ArticleType.ALL,
  onChangeType: () => {},
};
NormalDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const RowDirectionRedesigned = Template.bind({});
RowDirectionRedesigned.args = {
  value: ArticleType.ALL,
  direction: 'row',
  onChangeType: () => {},
};
RowDirectionRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
