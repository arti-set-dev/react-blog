import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Text.module.scss';

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextSize {
  S = 'size-s',
  XS = 'size-xs',
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

export enum TextTheme {
  ERROR = 'error',
  PRIMARY = 'primary',
  INVERTED = 'inverted',
}

export enum TextWeight {
  BOLD = 'bold',
  REGULAR = 'regular',
}

interface TextProps {
    className?: string;
    size?: TextSize;
    theme?: TextTheme;
    weight?: TextWeight;
    align?: TextAlign;
    children?: React.ReactNode;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    size = TextSize.S, theme = TextTheme.PRIMARY, weight = TextWeight.REGULAR, align = TextAlign.LEFT, children,
  } = props;
  return (
    <div className={classNames(cl.Text, {}, [className, cl[weight], cl[size], cl[theme], cl[align]])}>
      {children}
    </div>
  );
});
