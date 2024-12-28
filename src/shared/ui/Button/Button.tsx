import {
  ButtonHTMLAttributes, memo, ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Button.module.scss';

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export enum ButtonTheme {
  ICON = 'icon',
  OUTLINE_INVERTED = 'outline-inverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline-red',
  TEXT_INVERTED = 'text-inverted',
  PRIMARY = 'primary',
  TEXT_PRIMARY = 'text-primary',
  ACTIVE = 'active',
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
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    theme = ButtonTheme.PRIMARY, size = ButtonSize.L, type = ButtonType.BUTTON, disabled, fullWidth, ...otherProps
  } = props;

  const mods: Mods = {
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
  };

  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(cl.Button, mods, [className, cl[theme], cl[size]])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
