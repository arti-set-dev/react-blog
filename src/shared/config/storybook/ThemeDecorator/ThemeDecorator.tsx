import { Story } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line arti-set-fsd-checker-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  </ThemeProvider>
);

export const ThemeAndAppDecorator = (Story: Story, { globals }: { globals: any }) => {
  const themeFromGlobals = globals.themes;
  const themeClass = themeFromGlobals || Theme.LIGHT;

  return (
    <div className={`app ${themeClass}`}>
      <Story />
    </div>
  );
};
