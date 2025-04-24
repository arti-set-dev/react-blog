import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';
import { NotificationItem } from './NotificationItem';
import { Button } from '@/shared/ui/redesigned/Button';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    reactRouter: {
      routePath: '/articles/:id',
    },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

// Старый дизайн (deprecated)
export const Normal = Template.bind({});
Normal.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Оставьте комментарий к статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
};
Normal.decorators = [StoreDecorator({})];

export const WithoutLink = Template.bind({});
WithoutLink.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Системное уведомление без ссылки',
  },
};
WithoutLink.decorators = [StoreDecorator({})];

export const WithUiSwitcher = Template.bind({});
WithUiSwitcher.args = {
  notification: {
    id: '1',
    title: 'Смена интерфейса',
    description: 'Вы можете переключить интерфейс на новый дизайн',
    isUiSwitch: true,
  },
  uiSwitcher: <ButtonDeprecated>Переключить интерфейс</ButtonDeprecated>,
};
WithUiSwitcher.decorators = [StoreDecorator({})];

export const NormalDark = Template.bind({});
NormalDark.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Оставьте комментарий к статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

// Новый дизайн (redesigned)
export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Оставьте комментарий к статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithoutLinkRedesigned = Template.bind({});
WithoutLinkRedesigned.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Системное уведомление без ссылки',
  },
};
WithoutLinkRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const WithUiSwitcherRedesigned = Template.bind({});
WithUiSwitcherRedesigned.args = {
  notification: {
    id: '1',
    title: 'Смена интерфейса',
    description: 'Вы можете переключить интерфейс на новый дизайн',
    isUiSwitch: true,
  },
  uiSwitcher: <Button>Переключить интерфейс</Button>,
};
WithUiSwitcherRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];

export const NormalDarkRedesigned = Template.bind({});
NormalDarkRedesigned.args = {
  notification: {
    id: '1',
    title: 'Уведомление',
    description: 'Оставьте комментарий к статье',
    href: '/articles/1',
    hrefDescr: 'Перейти к статье',
  },
};
NormalDarkRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK), StoreDecorator({})];
