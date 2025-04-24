import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Container } from './Container';
import { Text } from '../Text';
import { Card } from '../Card';

export default {
  title: 'shared/redesigned/Container',
  component: Container,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

// Компонент с текстовым содержимым
const textContent = (
  <div>
    <Text tag="h2" size="xl">Заголовок контейнера</Text>
    <Text>
      Это пример текстового содержимого в контейнере. Контейнер используется для центрирования
      содержимого на странице и установки максимальной ширины.
    </Text>
  </div>
);

// Компонент с карточками
const cardsContent = (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    <Card>
      <div style={{ padding: '16px' }}>
        <Text tag="h3" size="m">Карточка 1</Text>
        <Text>Содержимое первой карточки</Text>
      </div>
    </Card>
    <Card>
      <div style={{ padding: '16px' }}>
        <Text tag="h3" size="m">Карточка 2</Text>
        <Text>Содержимое второй карточки</Text>
      </div>
    </Card>
    <Card>
      <div style={{ padding: '16px' }}>
        <Text tag="h3" size="m">Карточка 3</Text>
        <Text>Содержимое третьей карточки</Text>
      </div>
    </Card>
  </div>
);

// Стандартный контейнер
export const Default = Template.bind({});
Default.args = {
  children: textContent,
};

// Контейнер на всю ширину
export const Max = Template.bind({});
Max.args = {
  children: textContent,
  max: true,
};

// Контейнер с карточками
export const WithCards = Template.bind({});
WithCards.args = {
  children: cardsContent,
};

// Контейнер с карточками на всю ширину
export const WithCardsMax = Template.bind({});
WithCardsMax.args = {
  children: cardsContent,
  max: true,
};

// Контейнер с пользовательским классом
export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  children: textContent,
  className: 'custom-container-class',
};

// Темная тема
export const DefaultDark = Template.bind({});
DefaultDark.args = {
  children: textContent,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const MaxDark = Template.bind({});
MaxDark.args = {
  children: textContent,
  max: true,
};
MaxDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithCardsDark = Template.bind({});
WithCardsDark.args = {
  children: cardsContent,
};
WithCardsDark.decorators = [ThemeDecorator(Theme.DARK)];
