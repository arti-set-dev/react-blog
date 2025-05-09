import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>
export type IconColor = 'primary' | 'error' | 'inverted' | 'normal' | 'success';
export type IconAnimation = 'show';

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  color?: IconColor;
  animation?: IconAnimation | string;
}

interface NonClickableIconProps extends IconBaseProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
  const {
    className, width = 25, height = 25, color = '', Svg, clickable, animation = '', ...otherProps
  } = props;
  const { t } = useTranslation();

  return (
    <Svg
      width={width}
      height={height}
      className={classNames(cl.Icon, {}, [cl[color], cl[animation]])}
      {...otherProps}
    />
  );
});
