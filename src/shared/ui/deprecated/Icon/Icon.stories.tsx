import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Icon } from './Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-icon.svg';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import CodeIcon from '@/shared/assets/icons/code-icon.svg';

export default {
  title: 'shared/deprecated/Icon',
  component: Icon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Arrow = Template.bind({});
Arrow.args = {
  Svg: ArrowIcon,
};

export const Home = Template.bind({});
Home.args = {
  Svg: HomeIcon,
};

export const Eye = Template.bind({});
Eye.args = {
  Svg: EyeIcon,
};

export const Code = Template.bind({});
Code.args = {
  Svg: CodeIcon,
};

export const Dark = Template.bind({});
Dark.args = {
  Svg: ArrowIcon,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Small = Template.bind({});
Small.args = {
  Svg: ArrowIcon,
  width: 16,
  height: 16,
};

export const Medium = Template.bind({});
Medium.args = {
  Svg: ArrowIcon,
  width: 24,
  height: 24,
};

export const Large = Template.bind({});
Large.args = {
  Svg: ArrowIcon,
  width: 40,
  height: 40,
};
