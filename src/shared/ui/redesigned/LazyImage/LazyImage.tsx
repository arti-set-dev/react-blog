import {
  memo,
  useState,
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './LazyImage.module.scss';

export type ImageBorder = 'radius_l' | 'radius_xs';
export type ImageObjectFit = 'cover' | 'contain';
export type ImageAspectRatio = '16/9' | '4/3' | '1/1';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
  border?: ImageBorder;
  aspectRatio?: ImageAspectRatio;
  objectFit?: ImageObjectFit;
}

const aspectRatioClasses: Record<ImageAspectRatio, string> = {
  '16/9': cl.aspect_ratio_16_9,
  '4/3': cl.aspect_ratio_4_3,
  '1/1': cl.aspect_ratio_1_1,
};

export const LazyImage = memo((props: LazyImageProps) => {
  const {
    className,
    src,
    alt = '',
    fallback,
    errorFallback,
    border = '',
    objectFit = 'cover',
    aspectRatio,
    ...otherProps
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback;
  }

  if (hasError && errorFallback) {
    return errorFallback;
  }

  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      {...otherProps}
      className={classNames(cl.Image, {}, [
        className,
        cl[border],
        cl[objectFit],
        aspectRatio && aspectRatioClasses[aspectRatio],
      ])}
    />
  );
});
