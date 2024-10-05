import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './ThemeSwither.module.scss';

interface ThemeSwitherProps {
    className?: string;
}

export const ThemeSwither:FC<ThemeSwitherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.THEME}
            onClick={toggleTheme}
            className={classNames(cls.ThemeSwither, {}, [className])}
        >
            toggleTheme
            <ThemeIcon />
        </Button>
    );
};
