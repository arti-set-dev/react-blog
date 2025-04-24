import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { Theme } from '@/shared/const/theme';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileError } from '../../model/consts/consts';
import { EditableProfileCard } from './EditableProfileCard';
import avatar from './storybook.jpg';

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент редактируемой карточки профиля пользователя',
      },
    },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
  <EditableProfileCard {...args} />
);

const mockProfileData = {
  id: '1',
  firstname: 'Иван',
  lastname: 'Иванов',
  age: 25,
  currency: Currency.USD,
  country: Country.USA,
  city: 'Москва',
  username: 'ivan123',
  avatar,
};

export const Normal = Template.bind({});
Normal.args = {
  id: '1',
};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: true,
      isLoading: false,
    },
  }),
];
Normal.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля в режиме просмотра',
    },
  },
};

export const Editing = Template.bind({});
Editing.args = {
  id: '1',
};
Editing.decorators = [
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: false,
      isLoading: false,
    },
  }),
];
Editing.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля в режиме редактирования',
    },
  },
};

export const WithError = Template.bind({});
WithError.args = {
  id: '1',
};
WithError.decorators = [
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: false,
      isLoading: false,
      validateErrors: [
        ValidateProfileError.NO_DATA_USER_FIRSTNAME,
        ValidateProfileError.INCORRECT_CITY,
      ],
    },
  }),
];
WithError.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля с ошибками валидации',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  id: '1',
};
Loading.decorators = [
  StoreDecorator({
    profile: {
      form: undefined,
      data: undefined,
      readonly: true,
      isLoading: true,
    },
  }),
];
Loading.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля в состоянии загрузки',
    },
  },
};

export const ServerError = Template.bind({});
ServerError.args = {
  id: '1',
};
ServerError.decorators = [
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: true,
      isLoading: false,
      error: 'Ошибка при загрузке профиля',
    },
  }),
];
ServerError.parameters = {
  docs: {
    description: {
      story: 'Ошибка сервера при загрузке данных профиля',
    },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  id: '1',
};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: true,
      isLoading: false,
    },
  }),
];
Dark.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля в темной теме',
    },
  },
};

export const Redesigned = Template.bind({});
Redesigned.args = {
  id: '1',
};
Redesigned.decorators = [
  NewDesignDecorator,
  StoreDecorator({
    profile: {
      form: mockProfileData,
      data: mockProfileData,
      readonly: true,
      isLoading: false,
    },
  }),
];
Redesigned.parameters = {
  docs: {
    description: {
      story: 'Карточка профиля в новом дизайне',
    },
  },
};
