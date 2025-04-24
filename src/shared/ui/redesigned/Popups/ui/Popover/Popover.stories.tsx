import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Popover } from './Popover';
import { Button } from '../../../Button';
import { Text } from '../../../Text';
import { Card } from '../../../Card';

export default {
  title: 'shared/redesigned/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: <Button>Открыть панель</Button>,
  children: (
    <Card offset="16">
      <Text>Содержимое попапа</Text>
    </Card>
  ),
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  trigger: <Button>Вверх влево</Button>,
  direction: 'top left',
  children: (
    <Card offset="16">
      <Text>Направление top left</Text>
    </Card>
  ),
};

export const TopRight = Template.bind({});
TopRight.args = {
  trigger: <Button>Вверх вправо</Button>,
  direction: 'top right',
  children: (
    <Card offset="16">
      <Text>Направление top right</Text>
    </Card>
  ),
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger: <Button>Вниз влево</Button>,
  direction: 'bottom left',
  children: (
    <Card offset="16">
      <Text>Направление bottom left</Text>
    </Card>
  ),
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  trigger: <Button>Вниз вправо</Button>,
  direction: 'bottom right',
  children: (
    <Card offset="16">
      <Text>Направление bottom right</Text>
    </Card>
  ),
};

export const WithList = Template.bind({});
WithList.args = {
  trigger: <Button>Показать список</Button>,
  children: (
    <Card offset="16">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Text>Пункт 1</Text>
        <Text>Пункт 2</Text>
        <Text>Пункт 3</Text>
      </div>
    </Card>
  ),
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  trigger: <Button>Темная тема</Button>,
  children: (
    <Card offset="16">
      <Text>Содержимое попапа</Text>
    </Card>
  ),
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
