import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { LangSwitcher } from './LangSwitcher';

export default {
  title: 'features/LangSwitcher',
  component: LangSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент для переключения языка приложения',
      },
    },
  },
} as ComponentMeta<typeof LangSwitcher>;

const Template: ComponentStory<typeof LangSwitcher> = (args) => (
  <LangSwitcher {...args} />
);

// Стандартный вариант
export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
  docs: {
    description: {
      story: 'Стандартный переключатель языка с полным названием',
    },
  },
};

// Сокращенный вариант
export const Short = Template.bind({});
Short.args = {
  short: true,
};
Short.parameters = {
  docs: {
    description: {
      story: 'Переключатель языка с сокращенным названием',
    },
  },
};

// Темная тема
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
Dark.parameters = {
  docs: {
    description: {
      story: 'Переключатель языка в темной теме',
    },
  },
};

// Сокращенный вариант в темной теме
export const ShortDark = Template.bind({});
ShortDark.args = {
  short: true,
};
ShortDark.decorators = [ThemeDecorator(Theme.DARK)];
ShortDark.parameters = {
  docs: {
    description: {
      story: 'Сокращенный переключатель языка в темной теме',
    },
  },
};

// Новый дизайн
export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [NewDesignDecorator];
Redesigned.parameters = {
  docs: {
    description: {
      story: 'Переключатель языка в новом дизайне',
    },
  },
};

// Сокращенный вариант в новом дизайне
export const ShortRedesigned = Template.bind({});
ShortRedesigned.args = {
  short: true,
};
ShortRedesigned.decorators = [NewDesignDecorator];
ShortRedesigned.parameters = {
  docs: {
    description: {
      story: 'Сокращенный переключатель языка в новом дизайне',
    },
  },
};

// Новый дизайн в темной теме
export const RedesignedDark = Template.bind({});
RedesignedDark.args = {};
RedesignedDark.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];
RedesignedDark.parameters = {
  docs: {
    description: {
      story: 'Переключатель языка в новом дизайне с темной темой',
    },
  },
};
