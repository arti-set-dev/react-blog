import { Theme, useTheme } from "app/providers/ThemeProvider";
import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from './ThemeSwither.module.scss';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';
import { Button, ThemeButton } from "shared/ui/Button/Button";

export enum ThemeColors {
    LIGHT = 'light',
    DARK = 'dark',
}

interface ThemeSwitherProps {
    className?: string;
}

export const ThemeSwither:FC<ThemeSwitherProps> = ({ className }) => {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button theme={ThemeButton.THEME} onClick={toggleTheme} className={classNames(cls.ThemeSwither, {}, [className])}>
            toggleTheme
            <ThemeIcon/>
        </Button>
    );
};