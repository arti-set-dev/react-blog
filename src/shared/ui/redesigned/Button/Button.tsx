import {
  ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Button.module.scss';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant =
  'icon' | 'outline-inverted' | 'outline' | 'outline-red' | 'text-inverted'|'primary'|'text-primary'|'active' | 'clear';

export type ButtonSize = 'xs' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    children,
    className,
    variant = 'primary',
    size = 'l',
    type = 'button',
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
  };

  return (
    <button
      disabled={disabled}
      type={type}
      className={classNames(cl.Button, mods, [className, cl[variant], cl[size]])}
      ref={ref}
      {...otherProps}
    >
      {children}
    </button>
  );
});
