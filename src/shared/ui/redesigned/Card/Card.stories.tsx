import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Card } from './Card';
import { Text } from '../Text';

export default {
  title: 'shared/redesigned/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const cardContent = (
  <div>
    <Text tag="h2" size="xl">
      Заголовок карточки
    </Text>
    <Text size="m">
      Содержимое карточки
    </Text>
  </div>
);

// Варианты карточек
export const Primary = Template.bind({});
Primary.args = {
  children: cardContent,
  variant: 'primary',
};

export const Outline = Template.bind({});
Outline.args = {
  children: cardContent,
  variant: 'outline',
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
  children: cardContent,
  variant: 'outline-inverted',
};

export const OutlineInvertedBg = Template.bind({});
OutlineInvertedBg.args = {
  children: cardContent,
  variant: 'outline-inverted-bg',
};

export const Inverted = Template.bind({});
Inverted.args = {
  children: cardContent,
  variant: 'inverted',
};

export const Active = Template.bind({});
Active.args = {
  children: cardContent,
  variant: 'active',
};

export const Transparent = Template.bind({});
Transparent.args = {
  children: cardContent,
  variant: 'transparent',
};

export const Accent = Template.bind({});
Accent.args = {
  children: cardContent,
  variant: 'accent',
};

// Различные границы
export const BorderRadius0 = Template.bind({});
BorderRadius0.args = {
  children: cardContent,
  border: '0',
};

export const BorderRadius4 = Template.bind({});
BorderRadius4.args = {
  children: cardContent,
  border: '4',
};

export const BorderRadius8 = Template.bind({});
BorderRadius8.args = {
  children: cardContent,
  border: '8',
};

export const BorderRadius10 = Template.bind({});
BorderRadius10.args = {
  children: cardContent,
  border: '10',
};

export const BorderRadius12 = Template.bind({});
BorderRadius12.args = {
  children: cardContent,
  border: '12',
};

export const BorderRadius20 = Template.bind({});
BorderRadius20.args = {
  children: cardContent,
  border: '20',
};

export const BorderRadiusCircle = Template.bind({});
BorderRadiusCircle.args = {
  children: cardContent,
  border: 'circle',
  height: 200,
  width: 200,
};

// Отступы
export const Offset0 = Template.bind({});
Offset0.args = {
  children: cardContent,
  offset: '0',
  isOffset: true,
};

export const Offset4 = Template.bind({});
Offset4.args = {
  children: cardContent,
  offset: '4',
  isOffset: true,
};

export const Offset8 = Template.bind({});
Offset8.args = {
  children: cardContent,
  offset: '8',
  isOffset: true,
};

export const Offset16 = Template.bind({});
Offset16.args = {
  children: cardContent,
  offset: '16',
  isOffset: true,
};

export const Offset24 = Template.bind({});
Offset24.args = {
  children: cardContent,
  offset: '24',
  isOffset: true,
};

// Позиционирование
export const PositionAbsolute = Template.bind({});
PositionAbsolute.args = {
  children: cardContent,
  position: 'absolute',
  positionCorner: 'top-right',
};

export const PositionSticky = Template.bind({});
PositionSticky.args = {
  children: cardContent,
  position: 'sticky',
};

export const PositionFixed = Template.bind({});
PositionFixed.args = {
  children: cardContent,
  position: 'fixed',
  positionCorner: 'bottom-right',
};

// Различные теги
export const TagDiv = Template.bind({});
TagDiv.args = {
  children: cardContent,
  tag: 'div',
};

export const TagSection = Template.bind({});
TagSection.args = {
  children: cardContent,
  tag: 'section',
};

export const TagHeader = Template.bind({});
TagHeader.args = {
  children: cardContent,
  tag: 'header',
};

// Размеры
export const FixedSize = Template.bind({});
FixedSize.args = {
  children: cardContent,
  width: 300,
  height: 200,
};

export const MaxWidth = Template.bind({});
MaxWidth.args = {
  children: cardContent,
  maxWidth: 400,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: cardContent,
  max: true,
};

// Состояния
export const Hovered = Template.bind({});
Hovered.args = {
  children: cardContent,
  isHovered: true,
};

export const WithAnimation = Template.bind({});
WithAnimation.args = {
  children: cardContent,
  animation: 'show',
};

export const WithOverflow = Template.bind({});
WithOverflow.args = {
  children: (
    <div>
      <Text tag="h2" size="xl">
        Заголовок карточки
      </Text>
      <Text size="m">
        Содержимое карточки
      </Text>
    </div>
  ),
  isOverflow: true,
  height: 150,
};

export const Hidden = Template.bind({});
Hidden.args = {
  children: cardContent,
  isHidden: true,
};

// Темные варианты
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: cardContent,
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: cardContent,
  variant: 'outline',
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
