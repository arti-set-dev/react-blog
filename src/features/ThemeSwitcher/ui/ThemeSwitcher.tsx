import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className } = props;
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
});
