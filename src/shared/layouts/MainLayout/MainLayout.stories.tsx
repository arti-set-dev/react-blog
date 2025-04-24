import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { MainLayout } from './MainLayout';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Container } from '@/shared/ui/redesigned/Container';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';
import image from './storybook.jpg';

export default {
  title: 'shared/layouts/MainLayout',
  component: MainLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
    StoreDecorator({}),
    (Story) => (
      <div style={{ height: '100vh', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MainLayout>;

const Template: ComponentStory<typeof MainLayout> = (args) => <MainLayout {...args} />;

// Подготавливаем моковые компоненты для макета
const Header = () => (
  <HStack justify="between" align="center" fullWidth className="header" style={{ padding: '16px' }}>
    <div>Logo</div>
    <HStack gap="16" align="center">
      <Button variant="clear">Главная</Button>
      <Button variant="clear">О сайте</Button>
      <Button variant="clear">Статьи</Button>
      <Button>Войти</Button>
    </HStack>
  </HStack>
);

const Sidebar = () => (
  <VStack gap="16" style={{ padding: '24px 16px', background: 'var(--light-bg)' }}>
    <Card offset="16">
      <VStack gap="8" align="center">
        <Avatar size={100} src={image} />
        <Text weight="bold">Иван Иванов</Text>
        <Text variant="primary-light">Frontend Developer</Text>
        <Button fullWidth>Редактировать</Button>
      </VStack>
    </Card>
    <Card offset="16">
      <VStack gap="8">
        <Button fullWidth variant="outline">Профиль</Button>
        <Button fullWidth variant="outline">Настройки</Button>
        <Button fullWidth variant="outline">Выйти</Button>
      </VStack>
    </Card>
  </VStack>
);

const Content = () => (
  <Container max>
    <VStack gap="16" fullWidth>
      <Text tag="h1" size="xl">Заголовок страницы</Text>
      <Text>
        Это демонстрационный контент страницы. В реальном приложении здесь будет
        отображаться основное содержимое страницы: статьи, формы, списки и другие элементы.
      </Text>
      <Flex gap="16" flexWrap="wrap" direction="initial">
        {Array(6).fill(0).map((_, index) => (
          <Card key={index} offset="16" style={{ width: '280px' }}>
            <VStack gap="8">
              <Avatar size={40} src={image} />
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
  </Container>
);

const Footer = () => (
  <Container max>
    <HStack justify="between" align="center" fullWidth style={{ padding: '16px 0' }}>
      <Text>© 2023 Мой блог</Text>
      <HStack gap="16">
        <Button variant="clear">Политика конфиденциальности</Button>
        <Button variant="clear">Условия использования</Button>
      </HStack>
    </HStack>
  </Container>
);

const Toolbar = () => (
  <VStack gap="16" style={{ padding: '16px', background: 'var(--light-bg)' }}>
    <Card offset="16">
      <VStack gap="8">
        <Text weight="bold">Поиск</Text>
        <input
          type="text"
          placeholder="Искать..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid var(--icon)',
          }}
        />
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
  header: <Header />,
  sidebar: <Sidebar />,
  content: <Content />,
  footer: <Footer />,
};

export const WithToolbar = Template.bind({});
WithToolbar.args = {
  header: <Header />,
  sidebar: <Sidebar />,
  content: <Content />,
  footer: <Footer />,
  toolbar: <Toolbar />,
};

export const NoSidebar = Template.bind({});
NoSidebar.args = {
  header: <Header />,
  content: <Content />,
  footer: <Footer />,
};

export const NoSidebarWithToolbar = Template.bind({});
NoSidebarWithToolbar.args = {
  header: <Header />,
  content: <Content />,
  footer: <Footer />,
  toolbar: <Toolbar />,
};

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  content: <Content />,
};

export const Dark = Template.bind({});
Dark.args = {
  header: <Header />,
  sidebar: <Sidebar />,
  content: <Content />,
  footer: <Footer />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
  header: <Header />,
  sidebar: <Sidebar />,
  content: <Content />,
  footer: <Footer />,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];
