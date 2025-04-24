import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Code } from './Code';

export default {
  title: 'shared/redesigned/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [NewDesignDecorator],
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

// Простой короткий пример кода
const codeExample = `
const a = 5;
const b = 10;
console.log(a + b); // 15
`;

export const Default = Template.bind({});
Default.args = {
  text: codeExample,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
  text: codeExample,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
