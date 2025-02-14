import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children: ReactNode;
  max?: boolean;
}

export const Container = (props: ContainerProps) => {
  const { children, className, max } = props;
  return (
    <div className={classNames(cl.Container, { [cl.max]: max }, [className])}>{children}</div>
  );
};
