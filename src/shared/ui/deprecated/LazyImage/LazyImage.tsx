import {
  memo,
  useState,
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
} from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const LazyImage = memo((props: LazyImageProps) => {
  const {
    className,
    src,
    alt = '',
    fallback,
    errorFallback,
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
      className={className}
    />
  );
});
