import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { VStack } from './VStack';
import { Card } from '../../Card/Card';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';

export default {
  title: 'shared/redesigned/Stack/VStack',
  component: VStack,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof VStack>;

const Template: ComponentStory<typeof VStack> = (args) => <VStack {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Card offset="16">
        <Text>Первый элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Второй элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Третий элемент</Text>
      </Card>
    </>
  ),
};

export const Gap4 = Template.bind({});
Gap4.args = {
  gap: '4',
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const Gap8 = Template.bind({});
Gap8.args = {
  gap: '8',
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const Gap16 = Template.bind({});
Gap16.args = {
  gap: '16',
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const Gap24 = Template.bind({});
Gap24.args = {
  gap: '24',
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
  align: 'center',
  gap: '16',
  children: (
    <>
      <Card offset="16" style={{ width: '200px' }}>
        <Text>Центрированный элемент</Text>
      </Card>
      <Card offset="16" style={{ width: '250px' }}>
        <Text>Элемент пошире</Text>
      </Card>
      <Card offset="16" style={{ width: '150px' }}>
        <Text>Узкий элемент</Text>
      </Card>
    </>
  ),
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
  align: 'end',
  gap: '16',
  children: (
    <>
      <Card offset="16" style={{ width: '200px' }}>
        <Text>Выравнивание по правому краю</Text>
      </Card>
      <Card offset="16" style={{ width: '250px' }}>
        <Text>Элемент пошире</Text>
      </Card>
      <Card offset="16" style={{ width: '150px' }}>
        <Text>Узкий элемент</Text>
      </Card>
    </>
  ),
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
  justify: 'center',
  gap: '16',
  style: { height: '400px' },
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const JustifyEnd = Template.bind({});
JustifyEnd.args = {
  justify: 'end',
  gap: '16',
  style: { height: '400px' },
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const JustifyBetween = Template.bind({});
JustifyBetween.args = {
  justify: 'between',
  gap: '16',
  style: { height: '400px' },
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const MaxHeight = Template.bind({});
MaxHeight.args = {
  gap: '16',
  fullHeight: true,
  justify: 'between',
  style: { height: '400px', border: '1px solid lightgray' },
  children: (
    <>
      <Card offset="16">
        <Text>Верхний элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Центральный элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Нижний элемент</Text>
      </Card>
    </>
  ),
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  gap: '16',
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
