import { CSSProperties, FC, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Avatar.module.scss';

export enum AvatarLoading {
    LAZY = 'lazy',
    EAGER = 'eager',
}

interface AvatarProps {
    className?: string;
    src: string;
    alt: string;
    size?: number;
    loading?: AvatarLoading;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className, src, alt, size = 100, loading = AvatarLoading.LAZY,
  } = props;

  return (
    <img
      loading={loading}
      width={size}
      height={size}
      className={classNames(cl.Avatar, {}, [className])}
      src={src}
      alt={alt}
    />
  );
};
