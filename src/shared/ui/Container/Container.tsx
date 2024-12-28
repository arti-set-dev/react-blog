import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Container.module.scss';

interface ContainerProps {
    className?: string;
    children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children, className } = props;
  return (
    <div className={classNames(cl.Container, {}, [className])}>
      {children}
    </div>
  );
};
