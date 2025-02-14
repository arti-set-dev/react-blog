import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-icon.svg';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Button
          isHovered
          Svg={ThemeIcon}
          onClick={onToggleHandler}
          variant="icon"
          aria-label={t('Toggle Theme')}
        />
      )}
      off={(
        <ButtonDeprecated
          onClick={onToggleHandler}
          theme={ButtonTheme.ICON}
          className={classNames('', {}, [className])}
          aria-label={t('Toggle Theme')}
        >
          <Icon Svg={ThemeIcon} width="100%" height="100%" />
        </ButtonDeprecated>
      )}
    />
  );
});
