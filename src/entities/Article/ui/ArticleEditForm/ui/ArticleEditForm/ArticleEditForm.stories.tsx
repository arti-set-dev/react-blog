import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ArticleEditForm } from './ArticleEditForm';
import { ArticleBlockType, ArticleType } from '../../../../model/types/articleType';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import {
  ArticleBlock, ArticleTextBlock, ArticleCodeBlock, ArticleImageBlock,
} from '../../../../model/types/article';

export default {
  title: 'entities/ArticleEditForm',
  component: ArticleEditForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleEditForm>;

const Template: ComponentStory<typeof ArticleEditForm> = (args) => <ArticleEditForm {...args} />;

const textBlock: ArticleTextBlock = {
  id: '1',
  type: ArticleBlockType.TEXT,
  title: 'Введение',
  paragraphs: [
    'JavaScript — мультипарадигменный язык программирования.',
    'Является реализацией стандарта ECMAScript (стандарт ECMA-262).',
  ],
};

const codeBlock: ArticleCodeBlock = {
  id: '2',
  type: ArticleBlockType.CODE,
  code: 'console.log("Hello, world!");',
};

const imageBlock: ArticleImageBlock = {
  id: '3',
  type: ArticleBlockType.IMAGE,
  src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
  title: 'Логотип JavaScript',
};

const savedBlocks: ArticleBlock[] = [textBlock, codeBlock, imageBlock];

const baseArgs = {
  id: '1',
  articleTitle: 'Заголовок статьи про JavaScript',
  articleDescription: 'Краткое описание статьи о новых возможностях JavaScript',
  articlePreview: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  tabValue: 'text',
  types: [ArticleType.IT],
  isArticleValid: true,
  savedBlocks,
  handleEditBlock: action('handleEditBlock'),
  handleDeleteBlock: action('handleDeleteBlock'),
  setArticleTitle: action('setArticleTitle'),
  setArticleDescription: action('setArticleDescription'),
  setArticlePreview: action('setArticlePreview'),
  handleBlockChange: action('handleBlockChange'),
  handleCancel: action('handleCancel'),
  handleSaveBlock: action('handleSaveBlock'),
  handleTabChange: action('handleTabChange'),
  handleAddType: action('handleAddType'),
  onSaveArticle: action('onSaveArticle'),
  onBlockFileChange: action('onBlockFileChange'),
};

export const Default = Template.bind({});
Default.args = baseArgs;
Default.decorators = [StoreDecorator({})];

export const DefaultRedesigned = Template.bind({});
DefaultRedesigned.args = baseArgs;
DefaultRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  ...baseArgs,
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  ...baseArgs,
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithError = Template.bind({});
WithError.args = {
  ...baseArgs,
  error: 'Произошла ошибка при загрузке формы редактирования статьи',
};
WithError.decorators = [StoreDecorator({})];

export const WithErrorRedesigned = Template.bind({});
WithErrorRedesigned.args = {
  ...baseArgs,
  error: 'Произошла ошибка при загрузке формы редактирования статьи',
};
WithErrorRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  id: 'new',
  articleTitle: '',
  articleDescription: '',
  savedBlocks: [],
  isArticleValid: false,
  handleEditBlock: action('handleEditBlock'),
  handleDeleteBlock: action('handleDeleteBlock'),
  setArticleTitle: action('setArticleTitle'),
  setArticleDescription: action('setArticleDescription'),
  setArticlePreview: action('setArticlePreview'),
  handleBlockChange: action('handleBlockChange'),
  handleCancel: action('handleCancel'),
  handleSaveBlock: action('handleSaveBlock'),
  handleTabChange: action('handleTabChange'),
  handleAddType: action('handleAddType'),
  onSaveArticle: action('onSaveArticle'),
  onBlockFileChange: action('onBlockFileChange'),
};
EmptyForm.decorators = [StoreDecorator({})];

export const EmptyFormRedesigned = Template.bind({});
EmptyFormRedesigned.args = {
  id: 'new',
  articleTitle: '',
  articleDescription: '',
  savedBlocks: [],
  isArticleValid: false,
  handleEditBlock: action('handleEditBlock'),
  handleDeleteBlock: action('handleDeleteBlock'),
  setArticleTitle: action('setArticleTitle'),
  setArticleDescription: action('setArticleDescription'),
  setArticlePreview: action('setArticlePreview'),
  handleBlockChange: action('handleBlockChange'),
  handleCancel: action('handleCancel'),
  handleSaveBlock: action('handleSaveBlock'),
  handleTabChange: action('handleTabChange'),
  handleAddType: action('handleAddType'),
  onSaveArticle: action('onSaveArticle'),
  onBlockFileChange: action('onBlockFileChange'),
};
EmptyFormRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
