import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Loader } from './Loader';

export default {
  title: 'shared/redesigned/Loader',
  component: Loader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

// Базовые варианты
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Inverted = Template.bind({});
Inverted.args = {
  variant: 'inverted',
};

// Варианты с дополнительным классом
export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: 'custom-loader-class',
};

// Варианты в разных контейнерах
export const InCenter = Template.bind({});
InCenter.args = {};
InCenter.decorators = [
  (Story) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <Story />
    </div>
  ),
];

export const InCard = Template.bind({});
InCard.args = {};
InCard.decorators = [
  (Story) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      width: '300px',
      height: '200px',
      backgroundColor: '#ffffff',
    }}
    >
      <Story />
    </div>
  ),
];

export const InCardInverted = Template.bind({});
InCardInverted.args = {
  variant: 'inverted',
};
InCardInverted.decorators = [
  (Story) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      border: '1px solid #444',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      width: '300px',
      height: '200px',
      backgroundColor: '#333',
    }}
    >
      <Story />
    </div>
  ),
];

// Темная тема
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const InvertedDark = Template.bind({});
InvertedDark.args = {
  variant: 'inverted',
};
InvertedDark.decorators = [ThemeDecorator(Theme.DARK)];
