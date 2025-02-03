import { CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const {
    className,
    height,
    border,
    width,
  } = props;

  const styles: CSSProperties = {
    maxWidth: width,
    height,
    borderRadius: border,
  };

  return (
    <div
      style={styles}
      className={classNames(cl.Skeleton, {}, [className])}
    />
  );
};
