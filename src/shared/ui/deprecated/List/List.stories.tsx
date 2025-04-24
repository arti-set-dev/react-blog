import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { List } from './List';

export default {
  title: 'shared/deprecated/List',
  component: List,
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
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <li>Первый элемент списка</li>
      <li>Второй элемент списка</li>
      <li>Третий элемент списка</li>
      <li>Четвертый элемент списка</li>
      <li>Пятый элемент списка</li>
    </>
  ),
};

export const WithLinks = Template.bind({});
WithLinks.args = {
  children: (
    <>
      <li><a href="https://example.com/home">Главная страница</a></li>
      <li><a href="https://example.com/about">О нас</a></li>
      <li><a href="https://example.com/contacts">Контакты</a></li>
      <li><a href="https://example.com/blog">Блог</a></li>
      <li><a href="https://example.com/products">Продукты</a></li>
    </>
  ),
};

export const WithNestedLists = Template.bind({});
WithNestedLists.args = {
  children: (
    <>
      <li>
        Фрукты
        <List>
          <li>Яблоки</li>
          <li>Груши</li>
          <li>Бананы</li>
        </List>
      </li>
      <li>
        Овощи
        <List>
          <li>Помидоры</li>
          <li>Огурцы</li>
          <li>Морковь</li>
        </List>
      </li>
    </>
  ),
};

export const Dark = Template.bind({});
Dark.args = {
  children: (
    <>
      <li>Первый элемент списка</li>
      <li>Второй элемент списка</li>
      <li>Третий элемент списка</li>
      <li>Четвертый элемент списка</li>
      <li>Пятый элемент списка</li>
    </>
  ),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
