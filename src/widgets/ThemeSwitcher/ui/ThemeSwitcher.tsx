import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';
import { Theme, useTheme } from 'app/providers/ThemeProveder';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cl from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { children, className } = props;
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Button
      onClick={toggleTheme}
      theme={ButtonTheme.ICON}
      className={classNames('', {}, [className])}
      aria-label={t('Toggle Theme')}
    >
      <ThemeIcon />
    </Button>
  );
};
