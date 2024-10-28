import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './List.module.scss';

interface ListProps {
    className?: string;
}

export const List: FC<ListProps> = (props) => {
  const { children, className } = props;
  return (
    <ul className={classNames(cl.List, {}, [className])}>
      {children}
    </ul>
  );
};
