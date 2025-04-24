import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from './Text';

export default {
  title: 'shared/redesigned/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Текст по умолчанию, размер S',
};

// Размеры
export const SizeXXS = Template.bind({});
SizeXXS.args = {
  children: 'Текст размера XXS',
  size: 'xxs',
};

export const SizeXS = Template.bind({});
SizeXS.args = {
  children: 'Текст размера XS',
  size: 'xs',
};

export const SizeS = Template.bind({});
SizeS.args = {
  children: 'Текст размера S',
  size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
  children: 'Текст размера M',
  size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
  children: 'Текст размера L',
  size: 'l',
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  children: 'Текст размера XL',
  size: 'xl',
};

export const SizeXXL = Template.bind({});
SizeXXL.args = {
  children: 'Текст размера XXL',
  size: 'xxl',
};

// Варианты
export const Error = Template.bind({});
Error.args = {
  children: 'Текст с ошибкой',
  variant: 'error',
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
  children: 'Облегченный основной текст',
  variant: 'primary-light',
};

export const Inverted = Template.bind({});
Inverted.args = {
  children: 'Инвертированный текст',
  variant: 'inverted',
};

export const PrimaryAccent = Template.bind({});
PrimaryAccent.args = {
  children: 'Акцентированный текст',
  variant: 'primary-accent',
};

// Вес
export const Bold = Template.bind({});
Bold.args = {
  children: 'Жирный текст',
  weight: 'bold',
};

// Выравнивание
export const AlignCenter = Template.bind({});
AlignCenter.args = {
  children: 'Текст по центру',
  align: 'center',
};

export const AlignRight = Template.bind({});
AlignRight.args = {
  children: 'Текст по правому краю',
  align: 'right',
};

// Обрезка текста
export const Cropped2 = Template.bind({});
Cropped2.args = {
  children: 'Длинный текст, который будет обрезан до 2 строк. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    // eslint-disable-next-line max-len
    + 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  cropped: '2',
};

export const Cropped3 = Template.bind({});
Cropped3.args = {
  children: 'Длинный текст, который будет обрезан до 3 строк. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    // eslint-disable-next-line max-len
    + 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  cropped: '3',
};

// Теги
export const H1Tag = Template.bind({});
H1Tag.args = {
  children: 'Заголовок H1',
  tag: 'h1',
  size: 'xxl',
};

export const H2Tag = Template.bind({});
H2Tag.args = {
  children: 'Заголовок H2',
  tag: 'h2',
  size: 'xl',
};

export const H3Tag = Template.bind({});
H3Tag.args = {
  children: 'Заголовок H3',
  tag: 'h3',
  size: 'l',
};

// Состояния
export const Hovered = Template.bind({});
Hovered.args = {
  children: 'Текст с эффектом наведения',
  isHovered: true,
};

// Темная тема
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  children: 'Текст в темной теме',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
