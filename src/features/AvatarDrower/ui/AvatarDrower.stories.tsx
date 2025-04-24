import React, { useState, CSSProperties } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Button } from '@/shared/ui/redesigned/Button';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import avatar from './storybook.jpg';

// Полностью заменяем AvatarDrower для сторибука
const AvatarDrowerStoryComponent = (props: {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}) => {
  const {
    children,
    isOpen: initialIsOpen = false,
    onClose = () => {},
    onOpen = () => {},
  } = props;

  // Внутреннее состояние для демонстрации
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  // Стили для имитации дровера
  const drawerStyles: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    width: '300px',
    background: 'white',
    boxShadow: '-10px 0 10px rgba(0,0,0,0.1)',
    padding: '20px',
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
    overflow: 'auto',
  };

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: isOpen ? 'block' : 'none',
    zIndex: 999,
  };

  const avatarSrc = avatar;
  const username = 'admin';

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Button
        variant="icon"
        onClick={handleOpen}
        data-testid="avatar-button"
      >
        <Avatar size={25} src={avatarSrc} alt={username} />
      </Button>

      {/* Оверлей для затемнения фона */}
      <div
        style={overlayStyles}
        onClick={handleClose}
        data-testid="drawer-overlay"
      />

      {/* Сам дровер */}
      <div
        style={drawerStyles}
        data-testid="drawer-content"
      >
        <Button
          onClick={handleClose}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          data-testid="drawer-close-button"
        >
          Закрыть
        </Button>
        <div style={{ marginTop: '40px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'features/AvatarDrower',
  component: AvatarDrowerStoryComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    onOpen: { action: 'opened' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент выдвижного меню с аватаром для мобильных устройств. '
          + 'В Storybook используется специальная версия для демонстрации.',
      },
    },
  },
} as ComponentMeta<typeof AvatarDrowerStoryComponent>;

const Template: ComponentStory<typeof AvatarDrowerStoryComponent> = (args) => (
  <AvatarDrowerStoryComponent {...args} />
);

// История с открытым дровером
export const OpenedDrower = Template.bind({});
OpenedDrower.args = {
  children: (
    <Card>
      <Text>Содержимое дровера</Text>
      <Text>Какой-то текст внутри дровера</Text>
      <Text>Дополнительная информация</Text>
      <Button>Действие 1</Button>
      <Button>Действие 2</Button>
    </Card>
  ),
  isOpen: true,
};
OpenedDrower.parameters = {
  docs: {
    description: {
      story: 'Состояние с открытым дровером и авторизованным пользователем',
    },
  },
};

// История с закрытым дровером
export const ClosedDrower = Template.bind({});
ClosedDrower.args = {
  children: (
    <Card>
      <Text>Содержимое дровера</Text>
      <Text>Какой-то текст внутри дровера</Text>
      <Text>Дополнительная информация</Text>
      <Button>Действие 1</Button>
      <Button>Действие 2</Button>
    </Card>
  ),
  isOpen: false,
};
ClosedDrower.parameters = {
  docs: {
    description: {
      story: 'Состояние с закрытым дровером. Нажмите на аватар, чтобы открыть.',
    },
  },
};

// История в темной теме
export const Dark = Template.bind({});
Dark.args = {
  children: (
    <Card>
      <Text>Содержимое дровера</Text>
      <Text>Какой-то текст внутри дровера</Text>
      <Text>Дополнительная информация</Text>
      <Button>Действие 1</Button>
      <Button>Действие 2</Button>
    </Card>
  ),
  isOpen: true,
};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
];
Dark.parameters = {
  docs: {
    description: {
      story: 'Дровер в темной теме',
    },
  },
};
