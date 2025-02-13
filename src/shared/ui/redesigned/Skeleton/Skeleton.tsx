import { CSSProperties } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Skeleton.module.scss';

export type BorderRadius = '4' | '8' | '10' | '12' | '20' | 'circle';

const mapBorderRadius: Record<BorderRadius, string> = {
  4: 'radius_4',
  8: 'radius_8',
  10: 'radius_10',
  12: 'radius_12',
  20: 'radius_20',
  circle: 'circle',
};

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: BorderRadius;
}

export const Skeleton = (props: SkeletonProps) => {
  const {
    className,
    height,
    border = '20',
    width,
  } = props;

  const borderRadius = mapBorderRadius[border];

  const styles: CSSProperties = {
    maxWidth: width,
    height,
  };

  return (
    <div
      style={styles}
      className={classNames(cl.Skeleton, {}, [className, cl[borderRadius]])}
    />
  );
};
