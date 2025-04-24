import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from '../Text/Text';
import { Card } from './Card';

export default {
  title: 'shared/deprecated/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Обычная карточка</Text>
      <Text>Содержимое карточки может быть любым</Text>
    </div>
  ),
};

export const Hovered = Template.bind({});
Hovered.args = {
  isHovered: true,
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Карточка с эффектом наведения</Text>
      <Text>При наведении карточка изменит свой внешний вид</Text>
    </div>
  ),
};

export const WithOffset = Template.bind({});
WithOffset.args = {
  isOffset: true,
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Карточка с отступами</Text>
      <Text>Имеет внутренние отступы</Text>
    </div>
  ),
};

export const HoveredWithOffset = Template.bind({});
HoveredWithOffset.args = {
  isHovered: true,
  isOffset: true,
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Карточка с эффектом наведения и отступами</Text>
      <Text>Комбинация двух модификаторов</Text>
    </div>
  ),
};

export const Dark = Template.bind({});
Dark.args = {
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Карточка в темной теме</Text>
      <Text>Содержимое карточки может быть любым</Text>
    </div>
  ),
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkHovered = Template.bind({});
DarkHovered.args = {
  isHovered: true,
  children: (
    <div style={{ padding: '15px' }}>
      <Text>Карточка с эффектом наведения в темной теме</Text>
      <Text>При наведении карточка изменит свой внешний вид</Text>
    </div>
  ),
};
DarkHovered.decorators = [ThemeDecorator(Theme.DARK)];
