import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './List.module.scss';

interface ListProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const List = (props: ListProps) => {
  const { children, className, ...otherProps } = props;
  return (
    <ul className={classNames(cl.List, {}, [className])} {...otherProps}>
      {children}
    </ul>
  );
};
