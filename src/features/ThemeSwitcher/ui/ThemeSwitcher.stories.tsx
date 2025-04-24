import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент для переключения темы приложения',
      },
    },
  },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
  <div style={{
    padding: '20px', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'center',
  }}
  >
    <ThemeSwitcher {...args} />
  </div>
);

// Светлая тема (стандартная)
export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({}),
];
Light.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в светлой теме',
    },
  },
};

// Темная тема
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({}),
];
Dark.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в темной теме',
    },
  },
};

// Оранжевая тема
export const Orange = Template.bind({});
Orange.args = {};
Orange.decorators = [
  ThemeDecorator(Theme.ORANGE),
  StoreDecorator({}),
];
Orange.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в оранжевой теме',
    },
  },
};

// Редизайн - светлая тема
export const LightRedesigned = Template.bind({});
LightRedesigned.args = {};
LightRedesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({}),
];
LightRedesigned.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в светлой теме (новый дизайн)',
    },
  },
};

// Редизайн - темная тема
export const DarkRedesigned = Template.bind({});
DarkRedesigned.args = {};
DarkRedesigned.decorators = [
  NewDesignDecorator,
  ThemeDecorator(Theme.DARK),
  StoreDecorator({}),
];
DarkRedesigned.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в темной теме (новый дизайн)',
    },
  },
};

// Редизайн - оранжевая тема
export const OrangeRedesigned = Template.bind({});
OrangeRedesigned.args = {};
OrangeRedesigned.decorators = [
  NewDesignDecorator,
  ThemeDecorator(Theme.ORANGE),
  StoreDecorator({}),
];
OrangeRedesigned.parameters = {
  docs: {
    description: {
      story: 'ThemeSwitcher в оранжевой теме (новый дизайн)',
    },
  },
};
