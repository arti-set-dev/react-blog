import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Input, InputType } from './Input';

export default {
  title: 'shared/deprecated/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Введите текст',
  value: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: 'Введите текст',
  value: 'Значение поля ввода',
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Введите текст',
  value: 'Значение с ошибкой',
  error: 'Текст ошибки',
};

export const Readonly = Template.bind({});
Readonly.args = {
  placeholder: 'Только для чтения',
  value: 'Нельзя изменить',
  readonly: true,
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Введите пароль',
  type: InputType.PASSWORD,
  value: 'secretpassword',
};

export const Number = Template.bind({});
Number.args = {
  placeholder: 'Введите число',
  type: InputType.NUMBER,
  value: '42',
};

export const Textarea = Template.bind({});
Textarea.args = {
  placeholder: 'Введите длинный текст',
  textarea: true,
  value: 'Это многострочное текстовое поле для ввода длинных текстов и комментариев.'
    + ' Оно автоматически подстраивается под количество текста.',
};

export const TextareaWithError = Template.bind({});
TextareaWithError.args = {
  placeholder: 'Введите длинный текст',
  textarea: true,
  value: 'Неправильный текст',
  error: 'Текст не соответствует требованиям',
};

export const Dark = Template.bind({});
Dark.args = {
  placeholder: 'Введите текст',
  value: 'Текст в темной теме',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkWithError = Template.bind({});
DarkWithError.args = {
  placeholder: 'Введите текст',
  value: 'Текст с ошибкой',
  error: 'Текст ошибки',
};
DarkWithError.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkTextarea = Template.bind({});
DarkTextarea.args = {
  placeholder: 'Введите длинный текст',
  textarea: true,
  value: 'Многострочное поле в темной теме',
};
DarkTextarea.decorators = [ThemeDecorator(Theme.DARK)];
