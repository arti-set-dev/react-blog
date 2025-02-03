import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Loader.module.scss';

export type LoaderVariant = 'inverted' | 'primary';

interface LoaderProps {
  className?: string;
  variant?: LoaderVariant;
}

export const Loader = (props: LoaderProps) => {
  const {
    className,
    variant = 'primary',
  } = props;
  return (
    <div
      className={classNames(cl.Loader, {}, [className, cl[variant]])}
    />
  );
};
