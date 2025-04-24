import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { AvatarDropdown } from './AvatarDropdown';
import image from './storybook.jpg';

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

// История с авторизованным пользователем и аватаром
export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
        avatar: image,
      },
    },
  }),
];
Normal.parameters = {
  docs: {
    description: {
      story: 'Состояние дропдауна для авторизованного пользователя с аватаром',
    },
  },
};

// История без аватара
export const NoAvatar = Template.bind({});
NoAvatar.args = {};
NoAvatar.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  }),
];
NoAvatar.parameters = {
  docs: {
    description: {
      story: 'Состояние дропдауна для пользователя без аватара',
    },
  },
};

// История для неавторизованного пользователя
export const Unauthorized = Template.bind({});
Unauthorized.args = {};
Unauthorized.decorators = [
  StoreDecorator({
    user: {},
  }),
];
Unauthorized.parameters = {
  docs: {
    description: {
      story: 'Состояние дропдауна для неавторизованного пользователя',
    },
  },
};

// История с темной темой
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        username: 'admin',
        avatar: image,
      },
    },
  }),
];
Dark.parameters = {
  docs: {
    description: {
      story: 'Дропдаун в темной теме',
    },
  },
};
