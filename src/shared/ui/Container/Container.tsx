import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Container.module.scss';

interface ContainerProps {
    className?: string;
}

export const Container: FC<ContainerProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(cl.Container, {}, [className])}>
      {children}
    </div>
  );
};
