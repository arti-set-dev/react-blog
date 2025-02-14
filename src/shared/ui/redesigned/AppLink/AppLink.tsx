import { ForwardedRef, forwardRef, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './AppLink.module.scss';
import { Icon } from '../Icon/Icon';

export type AppLinkVariant = 'inverted' | 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
  isHovered?: boolean;
  Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const AppLink = forwardRef((props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
  const {
    children,
    className,
    activeClassName = '',
    to,
    variant = 'primary',
    isHovered = false,
    Svg,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cl.hovered]: isHovered,
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(cl.AppLink, mods, [className, cl[variant]])}
      ref={ref}
      {...otherProps}
    >
      {Svg && <Icon Svg={Svg} />}
      {children}
    </NavLink>
  );
});
