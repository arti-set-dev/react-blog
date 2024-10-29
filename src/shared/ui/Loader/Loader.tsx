import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(cl.Loader, {}, [className])} />
  );
};
