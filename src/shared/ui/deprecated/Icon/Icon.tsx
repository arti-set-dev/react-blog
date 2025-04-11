import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
  const { className, Svg, ...otherProps } = props;

  return (
    <Svg className={classNames(cl.Icon, {}, [className])} {...otherProps} />
  );
});
