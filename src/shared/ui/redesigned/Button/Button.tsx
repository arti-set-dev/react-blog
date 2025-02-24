import {
  ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Button.module.scss';
import { Icon } from '../Icon/Icon';

export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant =
  'icon' | 'outline-inverted' | 'outline' | 'outline-red' | 'text-inverted'|'primary'|'text-primary'|'active' | 'clear';

export type ButtonSize = 'xs' | 'l' | 'xl';

export type ButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  position?: ButtonPosition;
  isHovered?: boolean;
  isActive?: boolean;
  Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  notification?: number;
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
    position = '',
    isHovered = false,
    isActive = false,
    Svg,
    notification,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl.disabled]: disabled,
    [cl.fullWidth]: fullWidth,
    [cl.isAbsolute]: position !== '',
    [cl.isHovered]: isHovered,
    [cl.isActive]: isActive,
  };

  const notificationButton = (
    <div className={cl.notificationWrapper}>
      <div className={cl.notification}>
        {notification}
      </div>
      <button
        disabled={disabled}
        type={type}
        className={classNames(cl.Button, mods, [className, cl[variant], cl[size], cl[position]])}
        ref={ref}
        {...otherProps}
      >
        {Svg && <Icon width="100%" height="100%" Svg={Svg} />}
        {children}
      </button>
    </div>
  );

  return (
    notification
      ? notificationButton
      : (
        <button
          disabled={disabled}
          type={type}
          className={classNames(cl.Button, mods, [className, cl[variant], cl[size], cl[position]])}
          ref={ref}
          {...otherProps}
        >
          {Svg && <Icon width="100%" height="100%" Svg={Svg} />}
          {children}
        </button>
      )
  );
});
