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
  OUTLINE_INVERTED = 'outline-inverted',
  TEXT_INVERTED = 'text-inverted',
}

export enum ButtonSize {
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  type?: ButtonType;
  size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children, className, theme, size, type = ButtonType.BUTTON, ...otherProps
  } = props;
  return (
    <button
      type={type}
      className={classNames(cl.Button, {}, [className, cl[theme], cl[size]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
