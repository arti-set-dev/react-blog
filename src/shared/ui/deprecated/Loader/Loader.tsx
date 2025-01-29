import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Loader.module.scss';

export enum LoaderTheme {
  INVERTED = 'inverted',
  PRIMARY = 'primary',
}

export enum LoaderOffset {
  DEFAULT = 'offset-default',
  L = 'offset-l',
  XL = 'offset-xl',
  AUTO = 'auto',
}

interface LoaderProps {
  className?: string;
  theme?: LoaderTheme;
  offset?: LoaderOffset;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Loader = (props: LoaderProps) => {
  const {
    className,
    theme = LoaderTheme.INVERTED,
    offset = LoaderOffset.DEFAULT,
  } = props;
  return (
    <div
      className={classNames(cl.Loader, {}, [className, cl[theme], cl[offset]])}
    />
  );
};
