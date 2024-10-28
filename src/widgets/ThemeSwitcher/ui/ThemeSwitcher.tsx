import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';
import { Theme, useTheme } from 'app/providers/ThemeProveder';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cl from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { children, className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      theme={ButtonTheme.ICON}
      className={classNames('', {}, [className])}
      aria-label="Toggle Theme"
    >
      <ThemeIcon />
    </Button>
  );
};
