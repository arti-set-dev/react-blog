import React, { ReactElement } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { NotificationButton } from './NotificationButton';
import { Button } from '@/shared/ui/redesigned/Button';
import { NotificationList } from '@/entities/Notification';

// Мокаем API для имитации запросов уведомлений
const mockNotifications = [
  {
    id: '1',
    title: 'Уведомление 1',
    description: 'Оставлен новый комментарий к вашей статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
  {
    id: '2',
    title: 'Уведомление 2',
    description: 'У вас новое личное сообщение',
    href: '/profile/messages',
    hrefDescr: 'Открыть сообщения',
  },
];

interface NotificationButtonWithVisibleListProps {
  className?: string;
  isError?: boolean;
  isEmpty?: boolean;
  uiSwitcher?: ReactElement;
}

// Создаем компонент-обертку для правильного отображения уведомлений
const NotificationButtonWithVisibleList = (props: NotificationButtonWithVisibleListProps) => {
  const {
    isError = false, isEmpty = false, className, uiSwitcher,
  } = props;

  // Определяем данные в зависимости от выбранного состояния
  const notifications = isEmpty ? [] : mockNotifications;
  const error = isError ? 'Error loading notifications' : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ marginBottom: '8px' }}>
        <NotificationButton className={className} uiSwitcher={uiSwitcher} />
      </div>
      <div style={{
        width: '300px',
        border: '1px solid var(--hint)',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      >
        <NotificationList
          notifications={notifications}
          isLoading={false}
          error={error}
          uiSwitcher={uiSwitcher}
        />
      </div>
    </div>
  );
};

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Кнопка для отображения уведомлений пользователя. '
          + 'В сторибуке дополнительно показан список уведомлений для удобства тестирования.',
      },
    },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButtonWithVisibleList> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
    <NotificationButtonWithVisibleList {...args} />
  </div>
);

// С уведомлениями
export const WithNotifications = Template.bind({});
WithNotifications.args = {};
WithNotifications.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithNotifications.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 200,
    response: mockNotifications,
  }],
  docs: {
    description: {
      story: 'Кнопка с уведомлениями',
    },
  },
};

// Без уведомлений
export const WithoutNotifications = Template.bind({});
WithoutNotifications.args = {
  isEmpty: true,
};
WithoutNotifications.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithoutNotifications.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 200,
    response: [],
  }],
  docs: {
    description: {
      story: 'Кнопка без уведомлений',
    },
  },
};

// С ошибкой при загрузке
export const WithError = Template.bind({});
WithError.args = {
  isError: true,
};
WithError.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithError.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 500,
    response: null,
  }],
  docs: {
    description: {
      story: 'Ошибка при загрузке уведомлений',
    },
  },
};

// Темная тема
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
Dark.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 200,
    response: mockNotifications,
  }],
  docs: {
    description: {
      story: 'Кнопка в темной теме',
    },
  },
};

// Новый дизайн
export const Redesigned = Template.bind({});
Redesigned.args = {};
Redesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
Redesigned.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 200,
    response: mockNotifications,
  }],
  docs: {
    description: {
      story: 'Кнопка в новом дизайне',
    },
  },
};

// С UI Switcher
export const WithUiSwitcher = Template.bind({});
WithUiSwitcher.args = {
  uiSwitcher: <Button>Переключить UI</Button>,
};
WithUiSwitcher.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
WithUiSwitcher.parameters = {
  mockData: [{
    url: `${__API__}/notifications?userId=1`,
    method: 'GET',
    status: 200,
    response: mockNotifications,
  }],
  docs: {
    description: {
      story: 'Кнопка с элементом переключения UI',
    },
  },
};

// Неавторизованный пользователь
export const Unauthorized = Template.bind({});
Unauthorized.args = {};
Unauthorized.decorators = [
  StoreDecorator({
    user: {},
  }),
];
Unauthorized.parameters = {
  mockData: [{
    url: `${__API__}/notifications`,
    method: 'GET',
    status: 401,
    response: null,
  }],
  docs: {
    description: {
      story: 'Неавторизованный пользователь',
    },
  },
};
