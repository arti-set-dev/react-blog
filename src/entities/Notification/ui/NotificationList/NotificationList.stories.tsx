import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { NotificationList } from './NotificationList';
import { Button } from '@/shared/ui/redesigned/Button';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
  <NotificationList {...args} />
);

const notifications = [
  {
    id: '1',
    title: 'Уведомление 1',
    description: 'Оставьте комментарий к статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
  {
    id: '2',
    title: 'Уведомление 2',
    description: 'Системное уведомление без ссылки',
  },
  {
    id: '3',
    title: 'Смена интерфейса',
    description: 'Вы можете переключить интерфейс на новый дизайн',
    isUiSwitch: true,
  },
];

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  notifications,
};
Normal.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const Error = Template.bind({});
Error.args = {
  error: 'Error',
};
Error.decorators = [StoreDecorator({})];

export const Empty = Template.bind({});
Empty.args = {
  notifications: [],
};
Empty.decorators = [StoreDecorator({})];

export const WithUiSwitcher = Template.bind({});
WithUiSwitcher.args = {
  notifications,
  uiSwitcher: <ButtonDeprecated>Переключить интерфейс</ButtonDeprecated>,
};
WithUiSwitcher.decorators = [StoreDecorator({})];

export const NormalDark = Template.bind({});
NormalDark.args = {
  notifications,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  notifications,
};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const ErrorRedesigned = Template.bind({});
ErrorRedesigned.args = {
  error: 'Error',
};
ErrorRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const EmptyRedesigned = Template.bind({});
EmptyRedesigned.args = {
  notifications: [],
};
EmptyRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithUiSwitcherRedesigned = Template.bind({});
WithUiSwitcherRedesigned.args = {
  notifications,
  uiSwitcher: <Button>Переключить интерфейс</Button>,
};
WithUiSwitcherRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  notifications,
};
NormalDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
