import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { FeatureFlagsDecorator }
  from '../../src/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '../../src/shared/const/theme';
import { ThemeAndAppDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};

export const globalTypes = {
  themes: {
    name: 'Themes',
    description: 'Global theme switcher',
    defaultValue: Theme.LIGHT,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: Theme.LIGHT, title: 'Light' },
        { value: Theme.DARK, title: 'Dark' },
        { value: Theme.ORANGE, title: 'Orange' },
      ],
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeAndAppDecorator);
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
addDecorator(FeatureFlagsDecorator({}));
addDecorator(StoreDecorator({}));
