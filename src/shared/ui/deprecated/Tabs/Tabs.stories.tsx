import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs, TabItem } from './Tabs';

export default {
  title: 'shared/deprecated/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const tabs: TabItem[] = [
  {
    value: 'tab1',
    content: 'Первая вкладка',
  },
  {
    value: 'tab2',
    content: 'Вторая вкладка',
  },
  {
    value: 'tab3',
    content: 'Третья вкладка',
  },
  {
    value: 'tab4',
    content: 'Четвертая вкладка',
  },
];

export const Default = Template.bind({});
Default.args = {
  tabs,
  value: 'tab2',
};

export const WithWrap = Template.bind({});
WithWrap.args = {
  tabs,
  value: 'tab2',
  flexWrap: 'wrap',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  tabs,
  value: 'tab2',
  fullWidth: true,
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  tabs: [
    {
      value: 'tab1',
      content: 'Очень длинное название для первой вкладки',
    },
    {
      value: 'tab2',
      content: 'Еще более длинное название второй вкладки для демонстрации',
    },
    {
      value: 'tab3',
      content: 'Короткая вкладка',
    },
  ],
  value: 'tab2',
};

export const WithLongContentAndWrap = Template.bind({});
WithLongContentAndWrap.args = {
  tabs: [
    {
      value: 'tab1',
      content: 'Очень длинное название для первой вкладки',
    },
    {
      value: 'tab2',
      content: 'Еще более длинное название второй вкладки для демонстрации',
    },
    {
      value: 'tab3',
      content: 'Короткая вкладка',
    },
  ],
  value: 'tab2',
  flexWrap: 'wrap',
};
