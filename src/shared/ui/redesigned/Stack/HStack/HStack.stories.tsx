import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { HStack } from './HStack';
import { Card } from '../../Card/Card';
import { Text } from '../../Text/Text';
import { Button } from '../../Button/Button';

export default {
  title: 'shared/redesigned/Stack/HStack',
  component: HStack,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof HStack>;

const Template: ComponentStory<typeof HStack> = (args) => <HStack {...args} />;

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

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
  justify: 'center',
  gap: '16',
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
  children: (
    <>
      <Button>Первая кнопка</Button>
      <Button>Вторая кнопка</Button>
      <Button>Третья кнопка</Button>
    </>
  ),
};

export const AlignStart = Template.bind({});
AlignStart.args = {
  align: 'start',
  gap: '16',
  children: (
    <>
      <Card offset="16" style={{ height: '100px' }}>
        <Text>Высокий элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Обычный элемент</Text>
      </Card>
      <Card offset="16" style={{ height: '50px' }}>
        <Text>Средний элемент</Text>
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
      <Card offset="16" style={{ height: '100px' }}>
        <Text>Высокий элемент</Text>
      </Card>
      <Card offset="16">
        <Text>Обычный элемент</Text>
      </Card>
      <Card offset="16" style={{ height: '50px' }}>
        <Text>Средний элемент</Text>
      </Card>
    </>
  ),
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  gap: '16',
  fullWidth: true,
  justify: 'between',
  children: (
    <>
      <Button>Кнопка 1</Button>
      <Button>Кнопка 2</Button>
      <Button>Кнопка 3</Button>
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
