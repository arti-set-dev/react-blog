import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Button.module.scss';

export enum ButtonType {
    BUTTON = 'button',
    RESET = 'reset',
    SUBMIT = 'submit',
}

export enum ButtonTheme {
    ICON = 'icon',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    type?: ButtonType;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children, className, theme, type = ButtonType.BUTTON, ...otherProps
  } = props;
  return (
    <button
      type={type}
      className={classNames(cl.Button, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
