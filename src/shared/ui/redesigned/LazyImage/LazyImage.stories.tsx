import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { LazyImage } from './LazyImage';
import { Skeleton } from '../Skeleton';
import { Text } from '../Text';
import { Icon } from '../Icon';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';

// Примеры изображений для демонстрации
import validImageUrl from './storybook.jpg';

export default {
  title: 'shared/redesigned/LazyImage',
  component: LazyImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof LazyImage>;

const Template: ComponentStory<typeof LazyImage> = (args) => <LazyImage {...args} />;

// Базовый вариант
export const Default = Template.bind({});
Default.args = {
  src: validImageUrl,
  alt: 'Пример изображения',
  width: 300,
  height: 200,
};

// С использованием fallback
export const WithFallback = Template.bind({});
WithFallback.args = {
  src: validImageUrl,
  alt: 'Изображение с заглушкой',
  width: 300,
  height: 200,
  fallback: <Skeleton width={300} height={200} />,
};

// С использованием errorFallback
export const WithErrorFallback = Template.bind({});
WithErrorFallback.args = {
  src: 'invalid/image/url.jpg',
  alt: 'Изображение с ошибкой',
  width: 300,
  height: 200,
  errorFallback: (
    <div style={{
      width: 300,
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8f8',
    }}
    >
      <Icon Svg={WarningIcon} color="error" width={30} height={30} />
      <Text style={{ marginLeft: 10 }}>Ошибка загрузки</Text>
    </div>
  ),
};

// Разные границы
export const BorderRadiusL = Template.bind({});
BorderRadiusL.args = {
  src: validImageUrl,
  alt: 'Изображение с большим радиусом',
  width: 300,
  height: 200,
  border: 'radius_l',
};

export const BorderRadiusXs = Template.bind({});
BorderRadiusXs.args = {
  src: validImageUrl,
  alt: 'Изображение с маленьким радиусом',
  width: 300,
  height: 200,
  border: 'radius_xs',
};

// ObjectFit варианты
export const ObjectFitCover = Template.bind({});
ObjectFitCover.args = {
  src: validImageUrl,
  alt: 'Изображение с object-fit: cover',
  width: 300,
  height: 200,
  objectFit: 'cover',
};

export const ObjectFitContain = Template.bind({});
ObjectFitContain.args = {
  src: validImageUrl,
  alt: 'Изображение с object-fit: contain',
  width: 300,
  height: 200,
  objectFit: 'contain',
  style: { backgroundColor: '#f0f0f0' },
};

// Соотношения сторон
export const AspectRatio16x9 = Template.bind({});
AspectRatio16x9.args = {
  src: validImageUrl,
  alt: 'Изображение с соотношением 16:9',
  width: 400,
  aspectRatio: '16/9',
};

export const AspectRatio4x3 = Template.bind({});
AspectRatio4x3.args = {
  src: validImageUrl,
  alt: 'Изображение с соотношением 4:3',
  width: 400,
  aspectRatio: '4/3',
};

export const AspectRatio1x1 = Template.bind({});
AspectRatio1x1.args = {
  src: validImageUrl,
  alt: 'Изображение с соотношением 1:1',
  width: 400,
  aspectRatio: '1/1',
};

// Комбинированные варианты
export const CombinedFeatures = Template.bind({});
CombinedFeatures.args = {
  src: validImageUrl,
  alt: 'Изображение с несколькими свойствами',
  width: 400,
  aspectRatio: '16/9',
  border: 'radius_l',
  objectFit: 'cover',
  fallback: <Skeleton width="100%" height="225px" />,
};

// Темная тема
export const DefaultDark = Template.bind({});
DefaultDark.args = {
  src: validImageUrl,
  alt: 'Изображение в темной теме',
  width: 300,
  height: 200,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithBorderDark = Template.bind({});
WithBorderDark.args = {
  src: validImageUrl,
  alt: 'Изображение с границей в темной теме',
  width: 300,
  height: 200,
  border: 'radius_l',
};
WithBorderDark.decorators = [ThemeDecorator(Theme.DARK)];
