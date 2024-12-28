import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './List.module.scss';

interface ListProps {
    className?: string;
    children?: ReactNode;
}

export const List = (props: ListProps) => {
  const { children, className } = props;
  return (
    <ul className={classNames(cl.List, {}, [className])}>
      {children}
    </ul>
  );
};
