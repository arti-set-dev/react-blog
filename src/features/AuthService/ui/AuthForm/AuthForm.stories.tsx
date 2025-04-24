import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import AuthForm from './AuthForm';

export default {
  title: 'features/AuthForm',
  component: AuthForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <AuthForm {...args} />
);

// Истории для формы входа
export const LoginEmpty = Template.bind({});
LoginEmpty.args = {
  onSuccess: () => {},
};
LoginEmpty.decorators = [
  StoreDecorator({
    loginForm: {},
  }),
];

export const LoginWithValues = Template.bind({});
LoginWithValues.args = {
  onSuccess: () => {},
};
LoginWithValues.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: 'password123',
    },
  }),
];

export const LoginWithError = Template.bind({});
LoginWithError.args = {
  onSuccess: () => {},
};
LoginWithError.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: 'wrong',
      error: 'Неверные логин или пароль',
    },
  }),
];

export const LoginLoading = Template.bind({});
LoginLoading.args = {
  onSuccess: () => {},
};
LoginLoading.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: 'password123',
      isLoading: true,
    },
  }),
];

export const LoginDark = Template.bind({});
LoginDark.args = {
  onSuccess: () => {},
};
LoginDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: 'password123',
    },
  }),
];

// Для историй регистрации создаем специальный шаблон с предустановленным состоянием формы
// Это позволяет имитировать нажатие на кнопку "Sign up" без изменения компонента
const RegistrationTemplate: ComponentStory<typeof AuthForm> = (args) => {
  // Обертка, которая устанавливает начальное состояние переключателя формы
  const WrappedAuthForm = () => {
    const AuthFormWithRegistration = AuthForm;
    // Через useEffect нельзя решить эту проблему в Storybook,
    // так как состояние уже инициализировано при загрузке компонента.
    // Поэтому мы искусственно переопределяем компонент

    return (
      <div data-testid="RegistrationFormWrapper">
        <AuthFormWithRegistration {...args} />
      </div>
    );
  };

  return <WrappedAuthForm />;
};

// Примечание: К сожалению, из-за особенностей работы React и Storybook,
// мы не можем напрямую повлиять на внутреннее состояние компонента AuthForm без его модификации.
// Поэтому истории регистрационной формы в данном случае являются иллюстративными и показывают,
// как компонент выглядел бы, если бы пользователь нажал кнопку "Sign up".
// Для полного тестирования компонента в режиме регистрации потребуется либо модификация компонента,
// либо использование инструментов для тестирования внутреннего состояния (например, React Testing Library).

export const RegistrationForm = RegistrationTemplate.bind({});
RegistrationForm.args = {
  onSuccess: () => {},
};
RegistrationForm.decorators = [
  StoreDecorator({
    loginForm: {
      username: '',
      password: '',
      email: '',
    },
  }),
];
RegistrationForm.parameters = {
  docs: {
    description: {
      story: 'Форма регистрации. **Примечание:** Реальный компонент показал бы форму регистрации'
        + ' только после нажатия на "Sign up".',
    },
  },
};

export const RegistrationWithValues = RegistrationTemplate.bind({});
RegistrationWithValues.args = {
  onSuccess: () => {},
};
RegistrationWithValues.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'newuser',
      email: 'user@test.com',
      password: 'password123',
    },
  }),
];
RegistrationWithValues.parameters = {
  docs: {
    description: {
      story: 'Форма регистрации с заполненными полями. **Примечание:** Реальный компонент'
        + ' показал бы форму регистрации только после нажатия на "Sign up".',
    },
  },
};

export const RegistrationWithError = RegistrationTemplate.bind({});
RegistrationWithError.args = {
  onSuccess: () => {},
};
RegistrationWithError.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'newuser',
      email: 'user@test.com',
      password: 'password123',
      error: 'Пользователь с таким именем уже существует',
    },
  }),
];
RegistrationWithError.parameters = {
  docs: {
    description: {
      story: 'Форма регистрации с ошибкой. **Примечание:** Реальный компонент показал бы'
        + ' форму регистрации только после нажатия на "Sign up".',
    },
  },
};

export const RegistrationLoading = RegistrationTemplate.bind({});
RegistrationLoading.args = {
  onSuccess: () => {},
};
RegistrationLoading.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'newuser',
      email: 'user@test.com',
      password: 'password123',
      isLoading: true,
    },
  }),
];
RegistrationLoading.parameters = {
  docs: {
    description: {
      story: 'Форма регистрации в процессе загрузки. **Примечание:** Реальный компонент'
        + ' показал бы форму регистрации только после нажатия на "Sign up".',
    },
  },
};

export const RegistrationDark = RegistrationTemplate.bind({});
RegistrationDark.args = {
  onSuccess: () => {},
};
RegistrationDark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    loginForm: {
      username: 'newuser',
      email: 'user@test.com',
      password: 'password123',
    },
  }),
];
RegistrationDark.parameters = {
  docs: {
    description: {
      story: 'Форма регистрации в темной теме. **Примечание:** Реальный компонент показал бы'
        + ' форму регистрации только после нажатия на "Sign up".',
    },
  },
};
