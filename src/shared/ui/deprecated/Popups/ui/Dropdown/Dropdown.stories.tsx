import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button, ButtonTheme } from '../../../Button/Button';

export default {
  title: 'shared/deprecated/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};

export const OpenedByDefault: ComponentStory<typeof Dropdown> = (args) => {
  useEffect(() => {
    const triggerButton = document.querySelector('[class*="Trigger"]');
    if (triggerButton) {
      (triggerButton as HTMLElement).click();
    }
  }, []);

  return <Dropdown {...args} />;
};

OpenedByDefault.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
      disabled: true,
    },
    {
      content: 'last',
    },
  ],
};

export const WithLinks = Template.bind({});
WithLinks.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  items: [
    {
      content: 'first',
      href: '/first',
    },
    {
      content: 'middle',
      href: '/middle',
    },
    {
      content: 'last',
      href: '/last',
    },
  ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  direction: 'top left',
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};

export const TopRight = Template.bind({});
TopRight.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  direction: 'top right',
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  direction: 'bottom left',
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Open</Button>,
  direction: 'bottom right',
  items: [
    {
      content: 'first',
    },
    {
      content: 'middle',
    },
    {
      content: 'last',
    },
  ],
};
