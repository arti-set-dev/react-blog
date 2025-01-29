import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { LazyImage } from '../LazyImage';
import cl from './Avatar.module.scss';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';

export enum AvatarLoading {
  LAZY = 'lazy',
  EAGER = 'eager',
}

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  loading?: AvatarLoading;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size = 100,
    loading = AvatarLoading.LAZY,
  } = props;

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={ProfileIcon} />;

  return (
    <LazyImage
      fallback={fallback}
      errorFallback={errorFallback}
      loading={loading}
      width={size}
      height={size}
      className={classNames(cl.Avatar, {}, [className])}
      src={src}
      alt={alt}
    />
  );
};
