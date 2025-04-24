import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Loader, LoaderOffset, LoaderTheme } from './Loader';

export default {
  title: 'shared/deprecated/Loader',
  component: Loader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: LoaderTheme.PRIMARY,
};
Primary.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const Inverted = Template.bind({});
Inverted.args = {
  theme: LoaderTheme.INVERTED,
};
Inverted.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const WithOffsetDefault = Template.bind({});
WithOffsetDefault.args = {
  theme: LoaderTheme.PRIMARY,
  offset: LoaderOffset.DEFAULT,
};
WithOffsetDefault.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const WithOffsetL = Template.bind({});
WithOffsetL.args = {
  theme: LoaderTheme.PRIMARY,
  offset: LoaderOffset.L,
};
WithOffsetL.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const WithOffsetXL = Template.bind({});
WithOffsetXL.args = {
  theme: LoaderTheme.PRIMARY,
  offset: LoaderOffset.XL,
};
WithOffsetXL.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const WithOffsetAuto = Template.bind({});
WithOffsetAuto.args = {
  theme: LoaderTheme.PRIMARY,
  offset: LoaderOffset.AUTO,
};
WithOffsetAuto.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  theme: LoaderTheme.PRIMARY,
};
PrimaryDark.decorators = [
  ThemeDecorator(Theme.DARK),
  (Story) => (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];

export const InvertedDark = Template.bind({});
InvertedDark.args = {
  theme: LoaderTheme.INVERTED,
};
InvertedDark.decorators = [
  ThemeDecorator(Theme.DARK),
  (Story) => (
    <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
      <Story />
    </div>
  ),
];
