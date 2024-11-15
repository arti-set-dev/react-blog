import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Text.module.scss';

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
    text: string;
    size?: TextSize;
    theme?: TextTheme;
    weight?: TextWeight;
}

export const Text = memo((props: TextProps) => {
  const {
    className, text, size = TextSize.S, theme = TextTheme.PRIMARY, weight = TextWeight.REGULAR,
  } = props;
  return (
    <div className={classNames(cl.Text, {}, [className, cl[weight], cl[size], cl[theme]])}>
      {text}
    </div>
  );
});
