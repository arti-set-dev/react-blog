import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { StickyContentLayout } from './StickyContentLayout';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import image from '../MainLayout/storybook.jpg';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';

export default {
  title: 'shared/layouts/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
    StoreDecorator({}),
    (Story) => (
      <div style={{ height: '100vh', width: '100%', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof StickyContentLayout>;

const Template: ComponentStory<typeof StickyContentLayout> = (args) => <StickyContentLayout {...args} />;

// Компоненты для разделов макета
const Content = () => (
  <Card>
    <VStack gap="16" fullWidth>
      <Text tag="h1" size="xl">Основной контент</Text>
      <Text>
        Это демонстрационный контент страницы. В реальном приложении здесь будет
        отображаться основное содержимое страницы: статьи, формы, списки и другие элементы.
      </Text>
      <Flex gap="16" flexWrap="wrap" direction="initial">
        {Array(6).fill(0).map((_, index) => (
          <Card key={index} offset="16" style={{ width: '280px' }}>
            <VStack gap="8">
              <HStack>
                <Avatar size={40} src={image} />
                <Text weight="bold">Автор статьи</Text>
              </HStack>
              <Text size="m" weight="bold">
                Заголовок карточки
                {' '}
                {index + 1}
              </Text>
              <Text variant="primary-light" cropped="3">
                Это описание карточки. Здесь может быть размещена дополнительная информация
                о содержимом карточки. Текст может быть длинным и будет обрезаться после
                трех строк.
              </Text>
              <HStack justify="between">
                <Text size="s" variant="primary-light">12 мая 2023</Text>
                <Button>Подробнее</Button>
              </HStack>
            </VStack>
          </Card>
        ))}
      </Flex>
    </VStack>
  </Card>
);

const LeftSidebar = () => (
  <VStack gap="16">
    <Card offset="16">
      <VStack gap="8">
        <Text weight="bold">Навигация</Text>
        <VStack gap="8">
          <Button fullWidth variant="outline">Главная</Button>
          <Button fullWidth variant="outline">Статьи</Button>
          <Button fullWidth variant="outline">О сайте</Button>
          <Button fullWidth variant="outline">Профиль</Button>
        </VStack>
      </VStack>
    </Card>
  </VStack>
);

const RightSidebar = () => (
  <VStack gap="16">
    <Card offset="16">
      <VStack gap="8">
        <Text weight="bold">Популярные статьи</Text>
        <VStack gap="8">
          <HStack gap="8">
            <Avatar size={32} src={image} />
            <Text>Как создать React приложение</Text>
          </HStack>
          <HStack gap="8">
            <Avatar size={32} src={image} />
            <Text>TypeScript для начинающих</Text>
          </HStack>
          <HStack gap="8">
            <Avatar size={32} src={image} />
            <Text>Redux Toolkit - управление состоянием</Text>
          </HStack>
        </VStack>
      </VStack>
    </Card>
    <Card offset="16">
      <VStack gap="8">
        <Text weight="bold">Популярные теги</Text>
        <Flex gap="8" flexWrap="wrap">
          <Button variant="outline">JavaScript</Button>
          <Button variant="outline">React</Button>
          <Button variant="outline">TypeScript</Button>
          <Button variant="outline">Redux</Button>
        </Flex>
      </VStack>
    </Card>
  </VStack>
);

export const Default = Template.bind({});
Default.args = {
  content: <Content />,
  left: <LeftSidebar />,
  right: <RightSidebar />,
};

export const NoLeft = Template.bind({});
NoLeft.args = {
  content: <Content />,
  right: <RightSidebar />,
};

export const NoRight = Template.bind({});
NoRight.args = {
  content: <Content />,
  left: <LeftSidebar />,
};

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  content: <Content />,
};

export const Dark = Template.bind({});
Dark.args = {
  content: <Content />,
  left: <LeftSidebar />,
  right: <RightSidebar />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
  content: <Content />,
  left: <LeftSidebar />,
  right: <RightSidebar />,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
