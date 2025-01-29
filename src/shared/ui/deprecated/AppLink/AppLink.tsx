import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './AppLink.module.scss';

export enum AppLinkTheme {
  INVERTED = 'inverted',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const AppLink = memo((props: AppLinkProps) => {
  const {
    children,
    className,
    to,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;
  return (
    <Link
      to={to}
      className={classNames(cl.AppLink, {}, [className, cl[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
