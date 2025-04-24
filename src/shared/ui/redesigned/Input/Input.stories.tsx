import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Input } from './Input';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import { Icon } from '../Icon/Icon';

export default {
  title: 'shared/redesigned/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// Основные варианты
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Введите текст',
  value: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: 'Введите текст',
  value: 'Текст в поле ввода',
};

export const Outlined = Template.bind({});
Outlined.args = {
  placeholder: 'Введите текст',
  variant: 'outlined',
  value: '',
};

export const OutlinedWithValue = Template.bind({});
OutlinedWithValue.args = {
  placeholder: 'Введите текст',
  variant: 'outlined',
  value: 'Текст в поле ввода',
};

// Варианты с разными типами
export const Password = Template.bind({});
Password.args = {
  placeholder: 'Введите пароль',
  type: 'password',
  value: '12345678',
};

export const Number = Template.bind({});
Number.args = {
  placeholder: 'Введите число',
  type: 'number',
  value: '42',
};

// Варианты с фоном
export const TransparentBackground = Template.bind({});
TransparentBackground.args = {
  placeholder: 'Прозрачный фон',
  background: 'transparent',
  value: 'Текст на прозрачном фоне',
};

export const LightBackground = Template.bind({});
LightBackground.args = {
  placeholder: 'Светлый фон',
  background: 'light',
  value: 'Текст на светлом фоне',
};

// Варианты с ошибкой
export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Введите текст',
  value: 'Неправильное значение',
  error: 'Ошибка! Неверный формат.',
};

// Варианты с аддоном
export const WithAddon = Template.bind({});
WithAddon.args = {
  placeholder: 'Поиск',
  addon: <Icon Svg={SearchIcon} />,
};

export const WithAddonAndValue = Template.bind({});
WithAddonAndValue.args = {
  placeholder: 'Поиск',
  addon: <Icon Svg={SearchIcon} />,
  value: 'Поисковый запрос',
};

// Textarea
export const Textarea = Template.bind({});
Textarea.args = {
  placeholder: 'Введите комментарий',
  textarea: true,
  value: '',
};

export const TextareaWithValue = Template.bind({});
TextareaWithValue.args = {
  placeholder: 'Введите комментарий',
  textarea: true,
  value: 'Многострочный текст\nСледующая строка\nИ еще одна строка',
};

// Состояния
export const Readonly = Template.bind({});
Readonly.args = {
  placeholder: 'Только для чтения',
  value: 'Текст, который нельзя изменить',
  readonly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Отключено',
  value: 'Отключенный ввод',
  disabled: true,
};

// Темная тема
export const DefaultDark = Template.bind({});
DefaultDark.args = {
  placeholder: 'Введите текст',
  value: '',
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithValueDark = Template.bind({});
WithValueDark.args = {
  placeholder: 'Введите текст',
  value: 'Текст в поле ввода',
};
WithValueDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlinedDark = Template.bind({});
OutlinedDark.args = {
  placeholder: 'Введите текст',
  variant: 'outlined',
  value: '',
};
OutlinedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithErrorDark = Template.bind({});
WithErrorDark.args = {
  placeholder: 'Введите текст',
  value: 'Неправильное значение',
  error: 'Ошибка! Неверный формат.',
};
WithErrorDark.decorators = [ThemeDecorator(Theme.DARK)];
