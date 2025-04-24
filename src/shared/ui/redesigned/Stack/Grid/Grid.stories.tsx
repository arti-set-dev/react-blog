import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Grid } from './Grid';
import { Card } from '../../Card/Card';
import { Text } from '../../Text/Text';

export default {
  title: 'shared/redesigned/Stack/Grid',
  component: Grid,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    NewDesignDecorator,
  ],
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

const CardItem = ({ text }: { text: string }) => (
  <Card offset="16">
    <Text>{text}</Text>
  </Card>
);

const items = Array(6).fill(0).map((_, index) => (
  <CardItem key={index} text={`Карточка ${index + 1}`} />
));

export const Default = Template.bind({});
Default.args = {
  children: items,
};

export const Gap4 = Template.bind({});
Gap4.args = {
  children: items,
  gap: '4',
};

export const Gap8 = Template.bind({});
Gap8.args = {
  children: items,
  gap: '8',
};

export const Gap16 = Template.bind({});
Gap16.args = {
  children: items,
  gap: '16',
};

export const Gap24 = Template.bind({});
Gap24.args = {
  children: items,
  gap: '24',
};

export const Gap32 = Template.bind({});
Gap32.args = {
  children: items,
  gap: '32',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: items,
  gap: '16',
  fullWidth: true,
};

export const FullHeight = Template.bind({});
FullHeight.args = {
  children: items,
  gap: '16',
  fullHeight: true,
};

export const AsSection = Template.bind({});
AsSection.args = {
  children: items,
  gap: '16',
  tag: 'section',
};

export const AsUl = Template.bind({});
AsUl.args = {
  children: items.map((item, index) => (
    <li key={index}>{item}</li>
  )),
  gap: '16',
  tag: 'ul',
};

export const CustomMinMax = Template.bind({});
CustomMinMax.args = {
  children: items,
  gap: '16',
  minmax: {
    min: 150,
    max: '1fr',
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  children: items,
  gap: '16',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
