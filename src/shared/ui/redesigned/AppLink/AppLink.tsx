import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './AppLink.module.scss';

export type AppLinkVariant = 'inverted' | 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = forwardRef((props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const {
    children,
    className,
    activeClassName = '',
    to,
    variant = 'primary',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(cl.AppLink, { [activeClassName]: isActive }, [className, cl[variant]])}
      ref={ref}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
