import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Overlay } from './Overlay';
import { Text } from '../Text';
import { Button } from '../Button';

export default {
  title: 'shared/redesigned/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
    (Story) => (
      <div className="app_redesigned">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Overlay>;

// Шаблон для историй, которые показывают оверлей сразу открытым
const Template: ComponentStory<typeof Overlay> = (args) => (
  <div style={{ position: 'relative', height: '300px' }}>
    <Overlay {...args} />
  </div>
);

// Шаблон с кнопкой для интерактивного открытия оверлея
const ClickTemplate: ComponentStory<typeof Overlay> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <Button onClick={() => setIsOpen(true)}>Открыть оверлей</Button>
      <Overlay {...args} isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </div>
  );
};

// Базовый оверлей
export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  'data-testid': 'overlay',
};

// Оверлей с вложенным содержимым
export const WithContent = Template.bind({});
WithContent.args = {
  isOpen: true,
  children: (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        zIndex: 1,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Text tag="h2" size="xl">Содержимое поверх оверлея</Text>
      <Text>Этот контент отображается поверх оверлея и не закрывает его при клике.</Text>
    </div>
  ),
  'data-testid': 'overlay',
};

// Интерактивный оверлей
export const Interactive = ClickTemplate.bind({});
Interactive.args = {
  'data-testid': 'overlay',
};

// Оверлей с отключенным переполнением
export const WithoutOverflow = Template.bind({});
WithoutOverflow.args = {
  isOpen: true,
  overflowOff: true,
  'data-testid': 'overlay',
};

// Темная тема
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  'data-testid': 'overlay',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
