import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Listbox } from './ListBox';

export default {
  title: 'shared/deprecated/ListBox',
  component: Listbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => (
  <Listbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт' },
    { value: '3', content: 'Третий пункт' },
  ],
  value: '1',
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт' },
    { value: '3', content: 'Третий пункт' },
  ],
  value: '1',
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
  label: 'Выберите значение:',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт' },
    { value: '3', content: 'Третий пункт' },
  ],
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
};

export const WithDisabledItem = Template.bind({});
WithDisabledItem.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт', disabled: true },
    { value: '3', content: 'Третий пункт' },
  ],
  value: '1',
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт' },
    { value: '3', content: 'Третий пункт' },
  ],
  value: '1',
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
  readonly: true,
};

export const OpenedByDefault: ComponentStory<typeof Listbox> = (args) => {
  useEffect(() => {
    const triggerButton = document.querySelector('[class*="Trigger"]');
    if (triggerButton) {
      (triggerButton as HTMLElement).click();
    }
  }, []);

  return <Listbox {...args} />;
};

OpenedByDefault.args = {
  items: [
    { value: '1', content: 'Первый пункт' },
    { value: '2', content: 'Второй пункт' },
    { value: '3', content: 'Третий пункт' },
  ],
  value: '1',
  defaultValue: 'Выберите значение',
  onChange: (value) => {},
};
