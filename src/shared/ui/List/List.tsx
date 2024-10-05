import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './List.module.scss';

interface ListProps {
    className?: string;
}

export const List:FC<ListProps> = ({ className, children }) => (
    <ul className={classNames(cls.List, {}, [className])}>
        {children}
    </ul>
);
