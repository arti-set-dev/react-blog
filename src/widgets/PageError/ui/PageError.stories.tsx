import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { PageError } from './PageError';

export default {
  title: 'widgets/PageError',
  component: PageError,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageError>;

const Template: ComponentStory<typeof PageError> = (args) => (
  <PageError {...args} />
);

// Стандартный вид ошибки (светлая тема)
export const Light = Template.bind({});
Light.args = {};

// Ошибка в темной теме
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Ошибка с дополнительным текстом
export const WithContent = Template.bind({});
WithContent.args = {
  children: <p>Дополнительная информация об ошибке может быть показана здесь.</p>,
};

// Ошибка с дополнительным текстом в темной теме
export const WithContentDark = Template.bind({});
WithContentDark.args = {
  children: <p>Дополнительная информация об ошибке может быть показана здесь.</p>,
};
WithContentDark.decorators = [ThemeDecorator(Theme.DARK)];
