import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from './Container.module.scss';

interface ContainerProps {
    className?: string;
}

export const Container:FC<ContainerProps> = ({ className, children }) => {
    return (
        <div className={classNames(cls.Container, {}, [className])}>
            {children}
        </div>
    );
};