import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    THEME = 'theme',
    SIDE = 'side',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    theme?: ThemeButton;
}

export const Button:FC<ButtonProps> = (props) => {
    const {
        children, className, theme, type = 'button', ...otherProps
    } = props;
    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
