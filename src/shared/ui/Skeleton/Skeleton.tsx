import { CSSProperties } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Skeleton.module.scss';

export enum SkeletonAlign {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
    align?: SkeletonAlign | undefined;
}

export const Skeleton = (props: SkeletonProps) => {
  const {
    className, height, border, width, align = SkeletonAlign.CENTER,
  } = props;

  const styles: CSSProperties = {
    maxWidth: width,
    height,
    borderRadius: border,
  };

  return (
    <div style={styles} className={classNames(cl.Skeleton, {}, [className, cl[align]])} />
  );
};
