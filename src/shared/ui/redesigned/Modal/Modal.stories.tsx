import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Modal } from './Modal';
import { Text } from '../Text';
import { Button } from '../Button';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'app');
document.body.appendChild(modalRoot);

export default {
  title: 'shared/redesigned/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
  parameters: {
    docs: {
      autodocs: false,
    },
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
  },
} as ComponentMeta<typeof Modal>;

const ClickTemplate: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Открыть модальное окно</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

const OpenTemplate: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} isOpen onClose={() => {}} />
);

export const Default = OpenTemplate.bind({});
Default.args = {
  children: (
    <div style={{ padding: '20px' }}>
      <Text tag="h2" size="xl">Заголовок модального окна</Text>
      <Text>Содержимое модального окна. Здесь может быть любой контент.</Text>
    </div>
  ),
  'data-testid': 'Modal',
};

export const WithForm = OpenTemplate.bind({});
WithForm.args = {
  children: (
    <div style={{ padding: '20px', width: '400px' }}>
      <Text tag="h2" size="xl" style={{ marginBottom: '20px' }}>Форма входа</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Имя пользователя"
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <Button>Войти</Button>
      </div>
    </div>
  ),
  'data-testid': 'Modal',
};

export const WithLargeContent = OpenTemplate.bind({});
WithLargeContent.args = {
  children: (
    <div style={{ padding: '20px' }}>
      <Text tag="h2" size="xl">Подробная информация</Text>
      <div style={{ height: '300px', overflow: 'auto' }}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies
          lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel
          ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies
          lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel
          ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies
          lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel
          ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
        </Text>
      </div>
    </div>
  ),
  'data-testid': 'Modal',
};

export const Interactive = ClickTemplate.bind({});
Interactive.args = {
  children: (
    <div style={{ padding: '20px' }}>
      <Text tag="h2" size="xl">Интерактивное модальное окно</Text>
      <Text>Нажмите на кнопку &quot;Открыть модальное окно&quot;, чтобы увидеть его.</Text>
    </div>
  ),
  'data-testid': 'Modal',
};

export const DarkTheme = OpenTemplate.bind({});
DarkTheme.args = {
  children: (
    <div style={{ padding: '20px' }}>
      <Text tag="h2" size="xl">Заголовок модального окна</Text>
      <Text>Содержимое модального окна в темной теме.</Text>
    </div>
  ),
  'data-testid': 'Modal',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
