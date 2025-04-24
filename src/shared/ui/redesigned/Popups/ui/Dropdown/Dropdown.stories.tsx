import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button';
import { Text } from '../../../Text';

export default {
  title: 'shared/redesigned/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: <Button>Открыть меню</Button>,
  items: [
    {
      content: 'Профиль',
      onclick: () => {},
    },
    {
      content: 'Настройки',
      onclick: () => {},
    },
    {
      content: 'Выйти',
      onclick: () => {},
    },
  ],
  'data-testid': 'dropdown',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  trigger: <Button>Действия</Button>,
  items: [
    {
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>✏️</span>
          <Text>Редактировать</Text>
        </div>
      ),
      onclick: () => {},
    },
    {
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📋</span>
          <Text>Копировать</Text>
        </div>
      ),
      onclick: () => {},
    },
    {
      content: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🗑️</span>
          <Text>Удалить</Text>
        </div>
      ),
      onclick: () => {},
    },
  ],
  'data-testid': 'dropdown',
};

export const WithDisabledItems = Template.bind({});
WithDisabledItems.args = {
  trigger: <Button>Меню с отключенными элементами</Button>,
  items: [
    {
      content: 'Активный элемент',
      onclick: () => {},
    },
    {
      content: 'Отключенный элемент',
      onclick: () => {},
      disabled: true,
    },
    {
      content: 'Еще один активный элемент',
      onclick: () => {},
    },
  ],
  'data-testid': 'dropdown',
};

export const WithLinks = Template.bind({});
WithLinks.args = {
  trigger: <Button>Навигация</Button>,
  items: [
    {
      content: 'Главная страница',
      href: '/',
    },
    {
      content: 'О нас',
      href: '/about',
    },
    {
      content: 'Профиль',
      href: '/profile/1',
    },
  ],
  'data-testid': 'dropdown',
};

export const DirectionTopRight = Template.bind({});
DirectionTopRight.args = {
  trigger: <Button>Открыть вверх справа</Button>,
  direction: 'top right',
  items: [
    {
      content: 'Элемент 1',
      onclick: () => {},
    },
    {
      content: 'Элемент 2',
      onclick: () => {},
    },
    {
      content: 'Элемент 3',
      onclick: () => {},
    },
  ],
  'data-testid': 'dropdown',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  trigger: <Button>Темная тема</Button>,
  items: [
    {
      content: 'Профиль',
      onclick: () => {},
    },
    {
      content: 'Настройки',
      onclick: () => {},
    },
    {
      content: 'Выйти',
      onclick: () => {},
    },
  ],
  'data-testid': 'dropdown',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
